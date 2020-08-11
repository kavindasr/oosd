Goto settings and change database configerations before run the server.
If you are using nodemon to start the server use "nomdemon run start" command.

---

Can use these endpoints to interact with employee_table
1.>>GET - get list of employees - localhost:8000/api/employee/all
2.>>GET - get details of an emp - localhost:8000/api/employee/all?empid=178
3.>>POST - Add employee - localhost:8000/api/employee
body -  
 {
"empId":"10008",
"salId":"20008",
"empName":"'A.S.K.Kuma'",
"bdate":"1997-09-02",
"empType":"2",
"sex":"M"
} 5. PUT - update an employee details - localhost:8000/employees
body - {
"employee_id" : //id, --int
"salary_id" : //sal_id, --int
"name" : //name, --str
"dob" : //YYYY-MM-DD, --str
"employee_type" : //1/2/3/4, --int
"gender" : //M/F --str
} 6. DELETE- delete an employee - localhost:8000/employees
body - {
"employee_id" : //id, --int
}

---

Can use these endpoints to interact with daily_attendance

    1.>>GET  - get attendance list       - localhost:8000/api/attendance/all
    2.>>GET  - get attendance by date    - localhost:8000/api/attendance/all?date=2020-02-02
    3.>>GET  - get attendance of a div by date - localhost:8000/api/attendance/all?date=2020-02-02&div=2
    4.>>POST - Add employee attendance   - localhost:8000/api/attendance
        body -  [
                    {
                        "date"  : "2020-05-30",
                        "div"   : 1,
                        "empId" : 31,
                        "mode"  : 1
                    }
                ]
    5. PUT - update an employee details - localhost:8000/api/attendance?empid=178
        body -  {
                    "date"          : "2020-05-30",     --str
                    "division"      : 1,                --int
                    "method"        :1                  --int
                }
    6. DELETE- delete an employee       - localhost:8000/api/attendance?empid=178&tdate=1999-09-08

---

> > > > > > > d66dac67bca682c64414e78e8a471b8f3c558b8e
> > > > > > > Can use these endpoint to interact with vehicle_detail table
> > > > > > > 1.>>GET - get list of vehicles - localhost:8000/api/vehicle/all

---

Can use these endpoint to interact with division table
1.>>GET - get list of divisions - localhost:8000/api/division/all
2.>>GET - get details of a division - localhost:8000/api/division/all?divno=2

---
