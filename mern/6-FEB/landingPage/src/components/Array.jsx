import React from "react";

export const Array = () => {
  let students = [
    { name: "Vandana", age: 99, marks: 99 },
    { name: "Petrik", age: 87, marks: 88 },
    { name: "jitdik", age: 79, marks: 54 },
  ];

  return (
    <p>
      <h1>Vidhyarthi log</h1>
      <table class="table table-bordered">
        <thead class="table-dark">
          <tr >
            <td>Name</td>
            <td>Age</td>
            <td>Marks</td>
          </tr>
        </thead>
        <tbody class = 'table-light'>
          {students.map((stud) => {
            return (
              <tr>
                <td><span style={{color: stud.name.startsWith('V') ? "green" :"blue"}} >{stud.name}</span> </td>
                <td><span style={{color: stud.age > 80 ? "red": "blue"}}>{stud.age}</span></td>
                <td><span style={{color: stud.marks < 80 ?"red":"green"}}>{stud.marks}</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </p>
  );
};
