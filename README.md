Goto settings and change database configerations before run the server.
If you are using nodemon to start the server use "nomdemon run start" command.
------------------------------------------------------------------------------------------------
Can use these endpoints to interact with employee_table
(LOG IN with MOH credentials)
    1.>>>GET  - get list of employees     - localhost:8000/api/employee/all
    2.>>>GET  - get details of an emp     - localhost:8000/api/employee/all?empid=178
    3.>>>POST - Add employee              - localhost:8000/api/employee
        body -  
                    {
                            "empId"     : "10051",
                            "salId"     : "20051",
                            "empName"   : "'A.B.C.David'",
                            "bdate"     : "'1987-09-12'",
                            "empType"   : "3",
                            "sex"       : "'F'"
                    }
    5. >>>PUT - update an employee details - localhost:8000/api/employee?empid=10058
        body -  {
                    "salId"     : "10057",
                    "empName"   : "'T.U.Nimali'",
                    "bdate"     : "'1989-01-10'",
                    "empType"   : "3",
                    "sex"       : "'F'"
                }
    6. >>>DELETE- delete an employee       - localhost:8000/api/employee?empid=10058

------------------------------------------------------------------------------------------------
Can use these endpoints to interact with daily_attendance
    1.>>>GET  - get attendance list       - localhost:8000/api/attendance/all
    2.>>>GET  - get attendance by date    - localhost:8000/api/attendance/all?date='2020-02-05'
    3.>>>GET  - get attendance of a div by date - localhost:8000/api/attendance/all?date='2020-05-16'&div=3
    4.>>>POST - Add employee attendance   - localhost:8000/api/attendance
        body -  [
                    {
                        "date"  : "'2020-05-12'",
                        "div"   : 5,
                        "empId" : 178,
                        "mode"  : 1
                    }
                ]
    5. >>>PUT - update the attendance detail - localhost:8000/api/attendance?empid=178&date='2020-05-12'
        body -  
            {
                "div"   : 1,
                "mode"  : 0
            }
    6. >>>DELETE- delete an attendace record      - localhost:8000/api/attendance?empid=178&date='2020-05-12'
------------------------------------------------------------------------------------------------
Can use these endpoint to interact with vehicle_detail table
    1.>>>GET - get list of vehicles       - localhost:8000/api/vehicle/all
------------------------------------------------------------------------------------------------
Can use these endpoint to interact with division table
    1.>>>GET - get list of divisions         - localhost:8000/api/division/all
    2.>>>GET - get details of a division     - localhost:8000/api/division/all?divno=2
------------------------------------------------------------------------------------------------
Can use these end points to interact with gtype_detail
    1.>>GET - get the unit price for a garbage type - localhost:8000/api/gdetail/unitp?gtype="degradable"
    2.>>POST - add a new garbage type   - localhost:8000/api/gdetail
        body -  [
                    {
                        "gID"   : "19",
                        "gtype" : "'compost'",
                        "unitp" : "1200"
                    }
                ]
   

------------------------------------------------------------------------------------------------
Can use these end points to interact with gin_billed
    1.>>>POST - add a garbage in entry   - localhost:8000/api/ginbill
        body -  [
                    {
                        "inday"     : "'2020-12-12'",
                        "time"      : "'13:13:13'",
                        "gtypo"     : "'deg'",
                        "weight"    : "12",
                        "amnt"      : "1440"
                    }
                ]

------------------------------------------------------------------------------------------------
Can use these end points to interact with gin_unbilled table
    1.>>>POST - add a unbilled garbage in entry   - localhost:8000/api/gunbill
        body -  [
                    {
                        "inday"     : "'2020-12-12'",
                        "time"      : "'13:13:13'",
                        "gtypo"     : "'deg'",
                        "weight"    : "12",
                    }
                ]

------------------------------------------------------------------------------------------------
Can use these end points to interact with compost_in table
    1.>>>POST - add no of produced comp pct   - localhost:8000/api/compin
        body -  [
                    {
                        "inday"   :   "'2020-1-11'",
                        "time"    :   "'12:12:12'",
                        "pctin"   :   "12"
                    }
                ]

------------------------------------------------------------------------------------------------
Can use these end points to interact with compost_out table
    1.>>>POST - add no of sold comp pct   - localhost:8000/api/compout
        body -  [
                    {
                        "oday"      :   "'2020-12-12'",
                        "otime"     :   "'12:12:12'",
                        "pctout"    :   "12",
                        "amnt"      :   "1022.00"
                    }
                ]

------------------------------------------------------------------------------------------------
Can use these end points to interact with the user_table

1.>>>POST - add a user to the user table - localhost:8000/signup
    body - 
            {
                "userName": "rose",
                "userType": "clerk",
                "password": "clerk"
            }

2.>>>PUT - change the password of an existing user - localhost:8000/changePass?uName='meelan'
    body - 
            {
                "NewPassword" : "password"
            }

Passwords
    MOH - meelan - password
    Clerk -rose - clerk
    Depot - kavinda - depot
------------------------------------------------------------------------------------------------
