(async function () {

    const data = await fetch("data.json");
    const res = await data.json();
    let employees = res;

    let selectedEmployeeId = employees[0]?.id;
    let selectedEmployee = employees[0];

    const employeeList = document.querySelector(".employees__names--list");
    const employeeInfo = document.querySelector(".employees__single--info");

    const createEmployee = document.querySelector(".createEmployee");
    const addEmployeeModal = document.querySelector(".addEmployee");
    const addEmployeeForm = document.querySelector(".addEmployee_create");

    // show add employee modal
    createEmployee.addEventListener("click", () => {
        addEmployeeModal.style.display = "flex";
    });

    // Close modal when clicking outside form
    addEmployeeModal.addEventListener("click", (e) => {
        if (e.target.className === "addEmployee") {
            addEmployeeModal.style.display = "none";
        }
    });

    // Restrict DOB input -> Minimum 18 years old
    const dobInput = document.querySelector(".addEmployee_create--dob");
    const today = new Date();
    const year = today.getFullYear() - 18;
    const monthDay = today.toISOString().slice(5, 10); // MM-DD
    dobInput.max = `${year}-${monthDay}`;

})();
