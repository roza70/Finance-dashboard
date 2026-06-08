import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { accounts, categories, transactions } from "./db/schema";
import { createId } from "@paralleldrive/cuid2";
import * as dotenv from "dotenv";


dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// ⚠️ CHANGE THIS TO YOUR CLERK USER ID
const SEED_USER_ID = "user_3EJS3Ar3aPizCATsE5mbYceCCUF";



const SEED_CATEGORIES = [
  { id: createId(), name: "Food & Dining", userId: SEED_USER_ID },
  { id: createId(), name: "Transportation", userId: SEED_USER_ID },
  { id: createId(), name: "Entertainment", userId: SEED_USER_ID },
  { id: createId(), name: "Shopping", userId: SEED_USER_ID },
  { id: createId(), name: "Healthcare", userId: SEED_USER_ID },
  { id: createId(), name: "Utilities", userId: SEED_USER_ID },
  { id: createId(), name: "Salary", userId: SEED_USER_ID },
];

const SEED_ACCOUNTS = [
  { id: createId(), name: "Main Checking", userId: SEED_USER_ID },
  { id: createId(), name: "Savings", userId: SEED_USER_ID },
  { id: createId(), name: "Credit Card", userId: SEED_USER_ID },
];

function getRandomDate(daysAgo: number) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date;
}

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(transactions);
  await db.delete(categories);
  await db.delete(accounts);

  console.log("✓ Cleared existing data");

  // Insert accounts
  await db.insert(accounts).values(SEED_ACCOUNTS);
  console.log("✓ Inserted accounts");

  // Insert categories
  await db.insert(categories).values(SEED_CATEGORIES);
  console.log("✓ Inserted categories");

  const mainAccount = SEED_ACCOUNTS[0];
  const savingsAccount = SEED_ACCOUNTS[1];
  const creditCard = SEED_ACCOUNTS[2];

  const food = SEED_CATEGORIES[0];
  const transport = SEED_CATEGORIES[1];
  const entertainment = SEED_CATEGORIES[2];
  const shopping = SEED_CATEGORIES[3];
  const healthcare = SEED_CATEGORIES[4];
  const utilities = SEED_CATEGORIES[5];
  const salary = SEED_CATEGORIES[6];

  const SEED_TRANSACTIONS = [
    // Income
    { id: createId(), accountId: mainAccount.id, categoryId: salary.id, amount: 5000000, payee: "Company Salary", notes: "Monthly salary", date: getRandomDate(1) },
    { id: createId(), accountId: savingsAccount.id, categoryId: salary.id, amount: 1000000, payee: "Freelance Project", notes: "Web development project", date: getRandomDate(5) },
    { id: createId(), accountId: mainAccount.id, categoryId: salary.id, amount: 500000, payee: "Bonus", notes: "Performance bonus", date: getRandomDate(10) },

    // Food & Dining
    { id: createId(), accountId: creditCard.id, categoryId: food.id, amount: -85000, payee: "Restaurant", notes: "Dinner with friends", date: getRandomDate(2) },
    { id: createId(), accountId: mainAccount.id, categoryId: food.id, amount: -45000, payee: "Grocery Store", notes: "Weekly groceries", date: getRandomDate(4) },
    { id: createId(), accountId: creditCard.id, categoryId: food.id, amount: -25000, payee: "Coffee Shop", notes: "Morning coffee", date: getRandomDate(7) },
    { id: createId(), accountId: mainAccount.id, categoryId: food.id, amount: -120000, payee: "Supermarket", notes: "Monthly groceries", date: getRandomDate(15) },

    // Transportation
    { id: createId(), accountId: mainAccount.id, categoryId: transport.id, amount: -30000, payee: "Fuel Station", notes: "Car fuel", date: getRandomDate(3) },
    { id: createId(), accountId: mainAccount.id, categoryId: transport.id, amount: -15000, payee: "Uber", notes: "Ride to office", date: getRandomDate(6) },
    { id: createId(), accountId: creditCard.id, categoryId: transport.id, amount: -50000, payee: "Bus Pass", notes: "Monthly bus pass", date: getRandomDate(20) },

    // Entertainment
    { id: createId(), accountId: creditCard.id, categoryId: entertainment.id, amount: -15000, payee: "Netflix", notes: "Monthly subscription", date: getRandomDate(8) },
    { id: createId(), accountId: creditCard.id, categoryId: entertainment.id, amount: -10000, payee: "Spotify", notes: "Music subscription", date: getRandomDate(8) },
    { id: createId(), accountId: mainAccount.id, categoryId: entertainment.id, amount: -75000, payee: "Cinema", notes: "Movie night", date: getRandomDate(12) },

    // Shopping
    { id: createId(), accountId: creditCard.id, categoryId: shopping.id, amount: -250000, payee: "Online Store", notes: "Clothing purchase", date: getRandomDate(9) },
    { id: createId(), accountId: creditCard.id, categoryId: shopping.id, amount: -150000, payee: "Electronics Store", notes: "Accessories", date: getRandomDate(18) },
    { id: createId(), accountId: mainAccount.id, categoryId: shopping.id, amount: -80000, payee: "Bookstore", notes: "Programming books", date: getRandomDate(22) },

    // Healthcare
    { id: createId(), accountId: mainAccount.id, categoryId: healthcare.id, amount: -100000, payee: "Pharmacy", notes: "Medicine", date: getRandomDate(11) },
    { id: createId(), accountId: mainAccount.id, categoryId: healthcare.id, amount: -200000, payee: "Doctor Visit", notes: "Regular checkup", date: getRandomDate(25) },

    // Utilities
    { id: createId(), accountId: mainAccount.id, categoryId: utilities.id, amount: -80000, payee: "Electric Company", notes: "Monthly electricity", date: getRandomDate(14) },
    { id: createId(), accountId: mainAccount.id, categoryId: utilities.id, amount: -50000, payee: "Internet Provider", notes: "Monthly internet", date: getRandomDate(14) },
    { id: createId(), accountId: mainAccount.id, categoryId: utilities.id, amount: -30000, payee: "Water Company", notes: "Monthly water bill", date: getRandomDate(14) },
  ];

  await db.insert(transactions).values(SEED_TRANSACTIONS);
  console.log("✓ Inserted transactions");

  console.log("🎉 Seeding complete!");
}

seed().catch(console.error);
