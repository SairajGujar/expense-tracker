$ node index.js add --description "Lunch" --amount 20

$ node index.js add --description "Dinner" --amount 10

$ node index.js list
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10

$ node index.js summary
# Total expenses: $30

$ node index.js delete --id 1

$ node index.js summary --month 8
# Total expenses for August: $20

https://roadmap.sh/projects/expense-tracker
