(async function (){

    const data = await fetch("data.json");
    const res = await data.json();
    let employees = res;

    let selectedEmployeeId = employees[0].id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");

    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");


    //show add employee modal
    createEmployee.addEventListener("click", () => {
        addEmployeeModal.computedStyleMap.display = "flex";
    });

    // Close modal when clicking outside form

    addEmployeeModal.addEventListener("click", (e) => {
        if(e.target.className === "addEmployee"){
            addEmployeeModal.style.display = "none"
        }
    });

    // Restrict DOB  input -> Minimum 18 years old
    const dobInput = document.querySelector(".addEmployee_create--dob");
    dobInput.max = `${new Date().getFullYear() - 18}- ${new Date().toISOString().slice(5, 10)}`;

    
});