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
                            "empName"   : "A.B.C.David",
                            "bdate"     : "1987-09-12",
                            "empType"   : "3",
                            "sex"       : "F"
                    }
    5. >>>PUT - update an employee details - localhost:8000/api/employee?empid=10058
        body -  {
                    "salId"     : "10057",
                    "empName"   : "T.U.Nimali",
                    "bdate"     : "1989-01-10",
                    "empType"   : "3",
                    "sex"       : "F"
                }
    6. >>>DELETE- delete an employee       - localhost:8000/api/employee?empid=10058

------------------------------------------------------------------------------------------------
Can use these endpoints to interact with daily_attendance
    1.>>>GET  - get attendance list       - localhost:8000/api/attendance/all
    2.>>>GET  - get attendance by date    - localhost:8000/api/attendance/all?date=2020-02-05
    3.>>>GET  - get attendance of a div by 0 - localhost:8000/api/attendance/all?date=2020-05-16&div=3
    4.>>>GET  - get number of attended dates - localhost:8000/report/absentee?empID='1758'&month=5
    5.>>>GET  - get full daily attendence report - localhost:8000/report/dAttendence?date='2020-09-16'
    6.>>>POST - Add employee attendance   - localhost:8000/api/attendance

                    [
                        {"date": "2020-05-12","div": 2,"empId": 215,"mode": 1},
                        {"date": "2020-05-12","div": 2,"empId": 211,"mode": 2},
                        {"date": "2020-05-12","div": 2,"empId": 212,"mode": 1}
                    ]
    7. >>>PUT - update the attendance detail - localhost:8000/api/attendance?empid=178&date=2020-05-12
        body -  
            {
                "div"   : 1,
                "mode"  : 0
            }
    8. >>>DELETE- delete an attendace record      - localhost:8000/api/attendance?empid=178&date='2020-05-12'
------------------------------------------------------------------------------------------------
Can use these endpoint to interact with vehicle_detail table
    1.>>>GET - get list of vehicles       - localhost:8000/api/vehicle/all
------------------------------------------------------------------------------------------------
Can use these endpoint to interact with division table
    1.>>>GET - get list of divisions         - localhost:8000/api/division/all
    2.>>>GET - get details of a division     - localhost:8000/api/division/all?divno=2
------------------------------------------------------------------------------------------------
Can use these end points to interact with gin_types and gout_types(change the table name to gdetail)
    1.>>>GET - get the unit price for a garbage type - localhost:8000/api/gintype/unitp?gtype=Degradable
    2.>>>GET - get all data - localhost:8000/api/gintype/all
    3.>>>POST - add a new garbage type   - localhost:8000/api/gintype
        body -  [
                    {
                        "gID"   : "19",
                        "gtype" : "compost",
                        "unitp" : "1200"
                    }
                ]
    4.>>>PUT - change the detail of a type - localhost:8000/api/gintype?gID=19
            {
                "unitp": "120"
            }
    5.>>>DELETE - delete a type - localhost:8000/api/gintype?gID=19
------------------------------------------------------------------------------------------------
Can use these end points to interact with gin_billed
    1.>>>GET - get detail by invoice number   - localhost:8000/api/ginbill/all?invoice=122
    2.>>>GET - get detail by date   - localhost:8000/api/ginbill/all?inday="2020-12-12"
    3.>>>GET - Get all the entries within a given time period and its summary - 
        Weight Summary
            localhost:8000/report/dRange/billed?sDate='2020-09-01'&eDate='2020-09-30'
        Price Summary
            localhost:8000/report/dRange/billedAmount?sDate='2020-09-01'&eDate='2020-09-30'
    4.>>>POST - add a garbage in entry   - localhost:8000/api/ginbill
        body -  [
                    {
                        "invoice"   :   "122",
                        "inday"     :   "2020-12-12",
                        "time"      :   "13:13:13",
                        "gtypo"     :   "1",
                        "weight"    :   "12",
                        "amnt"      :   "1440"
                    }
                ]
    

------------------------------------------------------------------------------------------------
Can use these end points to interact with gin_unbilled table
    1.>>>GET - get detail by date   - localhost:8000/api/gunbill/all?inday=2020-09-07
    2.>>>GET - Get all the entries within a given time period and its summary - 
            localhost:8000/report/dRange/unbilled?sDate='2020-09-01'&eDate='2020-09-30'
    3.>>>POST - add a garbage in entry   - localhost:8000/api/gunbill
        body -  [
                    {
                        "inday": "2020-09-09",
                        "time": "13:13:13",
                        "gtypo": "1",
                        "weight": "67"
                    }
                ]
------------------------------------------------------------------------------------------------
Can use these end points to interact with garbage_out table
    1.>>>GET - get detail by invoice number   - localhost:8000/api/gout/all?invoice=30000
    2.>>>GET - get detail by date   - localhost:8000/api/gout/all?oday='2020-09-06'
    3.>>>GET - Get all the entries within a given time period and its summary - 
        Weight Summary
            localhost:8000/report/dRange/gOut?sDate='2020-09-01'&eDate='2020-09-30'
        Price summary
            localhost:8000/report/dRange/gOutPrice?sDate='2020-09-01'&eDate='2020-09-30'
    4.>>>POST - add garbage out detail  - localhost:8000/api/compout
        body -  [
                    {
                        "invoice"   :   "30005",
                        "oday"      :   "2020-09-09",
                        "otime"     :   "12:09:12",
                        "gtype"     :   "12",
                        "oweight"   :   "12",
                        "amnt"      :   "1022.00"
                    }
                ]
------------------------------------------------------------------------------------------------
Can use these end points to interact with compost_in table
    1.>>>GET - get detail by date   - localhost:8000/api/compin/all?inday=2020-12-12
    2.>>>POST - add no of produced comp pct   - localhost:8000/api/compin
        body -  [
                    {
                        "inday"   :   "2020-1-1",
                        "time"    :   "12:12:12",
                        "pctin"   :   "12"
                    }
                ]
     3.>>>GET - Get all the entries within a given time period and its summary - 
        Nof packt Summary
            localhost:8000/report/dRange/cin?sDate='2020-09-01'&eDate='2020-09-30'
------------------------------------------------------------------------------------------------
Can use these end points to interact with compost_out table
    1.>>>GET - get detail by invoice number   - localhost:8000/api/compout/all?invoice=50000
    2.>>>GET - get detail by date   - localhost:8000/api/compout/all?oday=2020-09-06

    3.>>>GET - Get all the entries within a given time period and its summary - 
        Nof Pct Summary
            localhost:8000/report/dRange/cOut?sDate='2020-09-01'&eDate='2020-09-30'
        Price summary
            localhost:8000/report/dRange/cOutPrice?sDate='2020-09-01'&eDate='2020-09-30'

    4.>>>POST - add no of sold comp pct   - localhost:8000/api/compout
        body -  [
                    {
                        "invoice"   :   "50002",
                        "oday"      :   "2020-09-12",
                        "otime"     :   "12:09:12",
                        "pctout"    :   "12",
                        "amnt"      :   "1022.00"
                    }
                ]
    2.>>>GET - Get all the entries within a given time period and its summary - 
            localhost:8000/report/dRange/cOut?sDate='2020-09-01'&eDate='2020-09-30'

------------------------------------------------------------------------------------------------
Can use these end points to interact with vehicle_distribution table
    1.>>>GET - GET all details   - localhost:8000/api/vehicleout/all
    2.>>>GET - GET data by div and date   - localhost:8000/api/vehicleout/all?div=2&date=2020-02-04
    3.>>>POST - add vehicle distribution detail   - localhost:8000/api/vehicleout
        body -  [
                    {
                        "date"      :   "2020-02-01",
                        "div"       :   "2",
                        "vehicleid" :   "1",
                        "driver"    :   "A.B.Kumara"
                    }
                ]                       
------------------------------------------------------------------------------------------------
Can use these end points to interact with vehicle_repair table
    1.>>>GET - GET all details   - localhost:8000/api/repair/all
    2.>>>GET - GET detail by vehicle index   - localhost:8000/api/repair/all?vehicleid=1
    3.>>>POST - add vehicle repair   - localhost:8000/api/repair
        body -  
                {
                    "vehicleid" :   1,
                    "repin"     :   "2020-08-02",
                    "repout"    :   "2020-09-08",
                    "replace"   :   "kurunegala"
                }
                   
------------------------------------------------------------------------------------------------
Get data from two tables use join
    Query inner join - localhost:8000/api/table1/join/inner/table2/joiningFieldFromTable1/joiningFieldFromTable2/fieldsTable1/fieldsTable2?conditions

    Query left join - localhost:8000/api/table1/join/left/table2/joiningFieldFromTable1/joiningFieldFromTable2/fieldsTable1/fieldsTable2?where=condition <-get condition from api-map>


------------------------------------------------------------------------------------------------
Reports- 
    1. Get vehicle distribution by date - http://localhost:8000/report/vehicleDistribution?date=2020-9-14
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
                "NewPassword" : "password",
                "CurrPassword" : "pass"
            }

Passwords
    MOH - meelan - pass
    Clerk -rose - clerk1
    Depot - kavinda - depot
------------------------------------------------------------------------------------------------
