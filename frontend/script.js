// Function to fetch and display student data
        function fetchStudents() {
            fetch('http://localhost:4000/students')
                .then(response => response.json())
                .then(data => {
                    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
                    studentTable.innerHTML = '';
                    data.forEach(student => {
                        const row = studentTable.insertRow();
                        row.innerHTML = `
                            <td>${student.id}</td>
                            <td>${student.name}</td>
                            <td>${student.age}</td>
                            <td>${student.loc}</td>
                            <td>
                                <button class="btn btn-primary editBtn" data-id="${student.id}">Edit</button>
                                <button class="btn btn-primary deleteBtn" data-id="${student.id}">Delete</button>
                            </td>
                        `;
                    });
                });
        }

        // Function to handle form submission
        document.getElementById('studentForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const id = document.getElementById('id').value;
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const loc = document.getElementById('loc').value;

            fetch('http://localhost:4000/students', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, age, loc }),
            })
            .then(response => response.json())
            .then(() => {
                fetchStudents();
                document.getElementById('id').value = '';
                document.getElementById('name').value = '';
                document.getElementById('age').value = '';
                document.getElementById('loc').value = '';
            });
        });

        // Function to handle delete button click
        document.getElementById('studentTable').addEventListener('click', function(event) {
            if (event.target.classList.contains('deleteBtn')) {
                const id = event.target.getAttribute('data-id');
                fetch(`http://localhost:4000/students/${id}`, {
                    method: 'DELETE',
                })
                .then(() => {
                    fetchStudents();
                });
            }
        });

        // Initial fetch of students data
        fetchStudents();