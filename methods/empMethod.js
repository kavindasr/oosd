const {Get,Post,Update} = require('./method');

class EmpGet{
    constructor(req,res,id){
        this.get = new Get(req,res);
        this.id = id;
        if(this.id){
            this.get.setQuery("*","employee_table",`employee_id= ${this.id}`);
        }
        else{
            this.get.setQuery("*","employee_table");
        }
    }
}

class EmpPost{
    constructor(req,res){
        this.post = new Post(req,res);
        this.post.setQuery("employee_table","employee_id, salary_id,name,dob,employee_type,gender",);
    }
}