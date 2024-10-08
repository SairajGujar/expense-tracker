const fs = require("fs");

// const args = process.argv.slice(2)
const readExpenses = () => {
  if (fs.existsSync("expenses.json")) {
    const data = fs.readFileSync("expenses.json", "utf8");
    if (data.length !== 0) return JSON.parse(data);
  }
  return [];
};
const writeExpenses = (expenses) => {
  fs.writeFileSync("expenses.json", JSON.stringify(expenses, null, 2));
};
const addExpense = (description, cost) => {
  const expenses = readExpenses();
  let id=1
  if(expenses.length>0){
    id = expenses[expenses.length-1].id+1;
  }
  const newExpense = {
    id:id,
    date: new Date().toUTCString(),
    description: description,
    amount: cost,
  };
  expenses.push(newExpense);
  writeExpenses(expenses);
};
const deleteExpense = (id)=>{
    const expense = readExpenses();
    const newExpenses = expense.filter((expense) =>{
        if(expense.id != id) return expense;
    })
    writeExpenses(newExpenses);
}

const { Command } = require("commander");
const program = new Command();

// Define a version
program.version("1.0.0");

// Define a command
program
  .command("add")
  .description("Add a new expense")
  .option("-d, --description <description>")
  .option("-a, --amount <amount>")
  .action((cmd) => {
    const {description, amount} = cmd
    addExpense(description, amount);
  });
program
.command("list")
.action(()=>{
    const expenses = readExpenses();
    expenses.forEach((expense)=>{
        console.log(expense.id+"    "+expense.date+"    "+expense.description+"    "+expense.amount)
    })
})
const map = {
    1:"Jan",
    2:"Feb",
    3:"Mar",
    4:"Apr",
    5:"May",
    6:"Jun",
    7:"Jul",
    8:"Aug",
    9:"Sep",
    10:"Oct",
    11:"Nov",
    12:"Dec"

}
program
.command("summary")
.option('--month <month>')
.action((cmd)=>{
    const expenses = readExpenses();
    const {month} = cmd;
    let sum=0;
    if(month){
        expenses.forEach((expense)=>{
            if(expense.date.includes(map[(month)])) sum+=parseInt(expense.amount, 10);
        })
    }
    else{
        expenses.forEach((expense)=>{
            sum+=parseInt(expense.amount, 10);
        })
    }
    
    console.log(sum)
})
program
.command("delete")
.option('--id')
.action((cmd)=>{
    const {id} = cmd;
    deleteExpense(id)
})


// Parse command-line arguments
program.parse(process.argv);
