let expenseController = (() => {

    let savings=0,total=0,investment=0,expense=0;
    return {
        inputEntry(userInput){
            var num=parseInt(userInput.value);
           // console.log(userInput['expenseType']);
            
            if(userInput['expenseType'] === 'savings'){
                savings+= num;
                total+=num;
                console.log(total); 
            }
            if(userInput['expenseType'] === 'investment'){
                investment+= num;
                total-=num;
            }
            if(userInput['expenseType'] === 'expense'){
                expense+= num;
                total-=num;
            }
        },
        getSavingsData(){
            return savings;
        },
        getExpensesData(){
            return expense;
        },
        getInvestmentsData(){
            return investment;
        },
        getTotalData(){
            return total;
        }

    }
})();

let UIController = ( () => {
    let expenseType='savings';

    let HTMLStrings = {
         currentMonth : '#current-month',
         btn_expense : '.btn-submit-expense',
         tracking_text : '.tracking-text',
         expense_description : '.input-expense-description',
         expense_value : '.input-expense-value',
         expense_list : '.expense-list',
         month_budget : '#month-budget',
         type_savings : '#type-savings',
         type_expense : '#type-expense',
         type_investment : '#type-investment',
         expense_chart : 'expense-chart'
    };
    return {
        numberFormat(number) {
            return Intl.NumberFormat('en-IN').format(number);
        },
        getHTMLStrings(){
            return HTMLStrings;
        },
        getCurrentMonth(){
            let month,months,year,now;
            now = new Date();
            month=now.getMonth();
            year=now.getFullYear();
            months = [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                'November', 'December'
            ];
            document.querySelector(HTMLStrings.currentMonth).textContent=months[month]+" "+year;

        },
        setExpenseType(type){
            this.expenseType=type;
            console.log("type "+type);
            let emoji ="💰";

            if(type==='savings'){
                emoji ="💰";
                if(document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-warning')){
                    document.querySelector(HTMLStrings.btn_expense).classList.remove('btn-warning');  
                }
                if(document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-danger')){
                    document.querySelector(HTMLStrings.btn_expense).classList.remove('btn-danger');  
                }
                if(!document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-success')){
                    document.querySelector(HTMLStrings.btn_expense).classList.add('btn-success');  
                }
                
            }
            if(type  ==='expense'){
                emoji ="💰";
                console.log("exp type "+expenseType);

                if(document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-warning')){
                    document.querySelector(HTMLStrings.btn_expense).classList.remove('btn-warning');  
                }
                if(document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-success')){
                    document.querySelector(HTMLStrings.btn_expense).classList.remove('btn-success');  
                }
                if(!document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-danger')){
                    document.querySelector(HTMLStrings.btn_expense).classList.add('btn-danger');  
                }
                
            }
            if(type ==='investment'){
                console.log("exp type "+expenseType);

                emoji ="💰";
                if(document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-success')){
                    document.querySelector(HTMLStrings.btn_expense).classList.remove('btn-success');  
                }
                if(document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-danger')){
                    document.querySelector(HTMLStrings.btn_expense).classList.remove('btn-danger');  
                }
                if(!document.querySelector(HTMLStrings.btn_expense).classList.contains('btn-warning')){
                    document.querySelector(HTMLStrings.btn_expense).classList.add('btn-warning');  
                }
             }
             document.querySelector(HTMLStrings.tracking_text).textContent="Tracking "+type+" "+emoji;
           
        },
        getUserExpenseInput(){
            return {
                description : document.querySelector(HTMLStrings.expense_description).value,
                value : document.querySelector(HTMLStrings.expense_value).value,
                date: new Date().toLocaleDateString(),
                expenseType : this.expenseType ? this.expenseType : 'savings'
            }
        },

        addItemList(inputObj){
            let html,element;
            element=HTMLStrings.expense_list;
            if (inputObj['expenseType'] === 'savings') {
                html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-saving fs-15"> ₹ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            } else if (inputObj['expenseType'] === 'expense') {
                console.log("happy hannukkah");
                html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-cost fs-15"> ₹ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            } else if (inputObj['expenseType'] === 'investment') {
                html = '<div class="bottom-border"> <div class="row expense-row"><div class="col-2 expense-date fs-15">' + inputObj['date'] + ' </div><div class="col-8 expense-text fs-15"> ' + inputObj['description'] + ' </div><div class="col-2 expense-value expense-investment fs-15"> ₹ ' + this.numberFormat(inputObj['value']) + ' </div></div>'
            }
            document.querySelector(element).insertAdjacentHTML('beforeend', html);

            document.querySelector(HTMLStrings.expense_value).value="";
            document.querySelector(HTMLStrings.expense_description).value="";

        },

        updateMonthTotal(totalValue){
            var element=document.querySelector(HTMLStrings.month_budget);
           // if(element) element.textContent="₹ "+this.numberFormat(totalValue);
           
           console.log("element "+element);
           
            document.querySelector(HTMLStrings.month_budget).textContent= "₹ "+this.numberFormat(totalValue);
            if((HTMLStrings.month_budget).classList){
                if(totalValue>0){
                    if(document.querySelector(HTMLStrings.month_budget.value).classList.contains('expense-cost')){
                        document.querySelector(HTMLStrings.month_budget.value).classList.remove('expense-cost')
                    }document.querySelector(HTMLStrings.month_budget).classList.add('expense-savings')
                }
                else{
                    if(document.querySelector(HTMLStrings.month_budget).classList.contains('expense-savings')){
                        document.querySelector(HTMLStrings.month_budget).classList.remove('expense-savings')
                    }document.querySelector(HTMLStrings.month_budget).classList.add('expense-cost')
               
                }
            }
            
            
        },
        
    }


})();

((expenseController,UIController) => {
let HTMLStrings=UIController.getHTMLStrings();

let setupEventListeners = () => {
    document.querySelector(HTMLStrings.btn_expense).addEventListener('click' , addExpense);
    document.querySelector(HTMLStrings.type_savings).addEventListener('click' , () =>{
setExpenseType('savings')
    });
    document.querySelector(HTMLStrings.type_investment).addEventListener('click' , () =>{
        setExpenseType('investment')
    });
    document.querySelector(HTMLStrings.type_expense).addEventListener('click' , () =>{
        setExpenseType('expense')
    });
};
let setExpenseType = (type) => {
   UIController.setExpenseType(type);
};

let addExpense = () => {
    //console.log("user input "+input);

    let input = UIController.getUserExpenseInput();
        if(input.description !== '' && !isNaN(input.value) && input.value>0){
        UIController.addItemList(input);
        expenseController.inputEntry(input);
        console.log("Total data "+expenseController.getTotalData());
        UIController.updateMonthTotal(expenseController.getTotalData());
        console.log(expenseController.getTotalData());
    }

}
let init = () => {
    setupEventListeners();
    UIController.getCurrentMonth();
}
init();
})(expenseController,UIController);
