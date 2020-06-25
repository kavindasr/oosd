class Response{
    setHeaders(code,msg,type){
        this.code = code;
        this.msg = msg;
        this.type = type;
    }

    send(res,data){
        res.writeHead(this.code,this.msg,this.type);
        if(data){
            res.write(data);
        }
        res.end();
    }
}

class Send200 extends Response{
    constructor(){
        super();
        super.setHeaders(200,"OK",{"Content-Type":"application/json"});
    }
}

class Send400 extends Response{
    constructor(){
        super();
        super.setHeaders(400,"Bad request",{"Content-Type":"application/json"});
    }
}

class Send404 extends Response{
    constructor(){
        super();
        super.setHeaders(404,"Not found",{"Content-Type":"application/json"});
    }
}

class Send405 extends Response{
    constructor(){
        super();
        super.setHeaders(405,"Method not allowed",{"Content-Type":"application/json"});
    }
}

class Send413 extends Response{
    constructor(){
        super();
        super.setHeaders(413,"Large request",{"Content-Type":"application/json"});
    }
}

class Send500 extends Response{
    constructor(){
        super();
        super.setHeaders(500,"Internal error occuered",{"Content-Type":"application/json"});
    }
}

class SendJson extends Response{
    constructor(){
        super();
        super.setHeaders(200,"OK",{"Content-Type": "application/json"});
    }
}

class SendHTML extends Response{
    constructor(){
        super();
        super.setHeaders(200,"OK",{"Content-Type": "text/html"});
    }
}

module.exports = {Send200,Send400,Send404,Send405,Send413,Send500,SendJson,SendHTML};