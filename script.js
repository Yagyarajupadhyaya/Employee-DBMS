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

  console.log("Employees from JSON:", employees);

  //rendered the employees into the table
  function renderEmployeeList() {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const item = document.createElement("div");
      item.className = "employees__names--item";
      item.dataset.id = emp.id;

      // highlight selected
      if (emp.id === selectedEmployeeId) {
        item.classList.add("selected");
      }

      item.innerHTML = `
        <span>${emp.firstName} ${emp.lastName}</span>
        <span>${emp.salary}</span>
      `;

      item.addEventListener("click", () => {
        selectedEmployeeId = emp.id;
        selectedEmployee = emp;
        renderEmployeeList();  
        renderEmployeeInfo();
      });

      employeeList.appendChild(item);
    });
  }

  function renderEmployeeInfo() {
    if (!selectedEmployee) {
      employeeInfo.innerHTML = "<p>No employee selected</p>";
      return;
    }

    employeeInfo.innerHTML = `
      <h2 class="employees__single--heading">
        ${selectedEmployee.firstName} ${selectedEmployee.lastName}
      </h2>
      <img src="${selectedEmployee.imageUrl || "https://via.placeholder.com/250"}" />
      <p>Email: ${selectedEmployee.email}</p>
      <p>Contact: ${selectedEmployee.contactNumber}</p>
      <p>Salary: ${selectedEmployee.salary}</p>
      <p>Address: ${selectedEmployee.address}</p>
      <p>DOB: ${selectedEmployee.dob}</p>
    `;
  }

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

  // Handle form submit: add employee
  addEmployeeForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop refresh

    const formData = new FormData(addEmployeeForm);

    const newEmployee = {
      id: Date.now(), // unique-ish id
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      imageUrl: formData.get("imageUrl"),
      email: formData.get("email"),
      contactNumber: formData.get("contactNumber"),
      salary: formData.get("salary"),
      address: formData.get("address"),
      dob: formData.get("dob"),
    };

    employees.push(newEmployee);
    selectedEmployeeId = newEmployee.id;
    selectedEmployee = newEmployee;

    renderEmployeeList();
    renderEmployeeInfo();

    addEmployeeForm.reset();
    addEmployeeModal.style.display = "none";
  });

  // Restrict DOB input -> Minimum 18 years old
  const dobInput = document.querySelector(".addEmployee_create--dob");
  const today = new Date();
  const year = today.getFullYear() - 18;
  const monthDay = today.toISOString().slice(5, 10);
  dobInput.max = `${year}-${monthDay}`;

  // INITIAL RENDER
  renderEmployeeList();
  renderEmployeeInfo();

})();
