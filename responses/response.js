class Response{
    constructor(data){
        this.data = data;
    }
    setHeaders(code,msg,type){
        this.code = code;
        this.msg = msg;
        this.type = type;
    }
    setData(data){
        this.data = data;
    }
    send(res){
        res.writeHead(this.code,this.msg,this.type);
        if(this.data){
            res.write(this.data);
        }
        res.end();
    }
}

class Send200 extends Response{
    constructor(data){
        super(data);
        super.setHeaders(200,"OK",{"Content-Type":"application/json"});
    }
}

class Send400 extends Response{
    constructor(data){
        super(data);
        super.setHeaders(400,"Bad request",{"Content-Type":"application/json"});
    }
}

class Send404 extends Response{
    constructor(data){
        super(data);
        super.setHeaders(404,"Not found",{"Content-Type":"application/json"});
    }
}

class Send405 extends Response{
    constructor(data){
        super(data);
        super.setHeaders(405,"Method not allowed",{"Content-Type":"application/json"});
    }
}

class Send406 extends Response{
    constructor(data){
        super(data);
        super.setHeaders(406,"Not acceptable",{"Content-Type":"application/json"});
    }
}

class Send413 extends Response{
    constructor(data){
        super(data);
        super.setHeaders(413,"Large request",{"Content-Type":"application/json"});
    }
}

class Send500 extends Response{
    constructor(data){
        super(data);
        super.setHeaders(500,"Internal error occuered",{"Content-Type":"application/json"});
    }
}

class SendJson extends Response{
    constructor(data){
        super(data);
        super.setHeaders(200,"OK",{"Content-Type": "application/json"});
    }
}

class SendHTML extends Response{
    constructor(data){
        super(data);
        super.setHeaders(200,"OK",{"Content-Type": "text/html"});
    }
}

class SendCSS extends Response{
    constructor(data){
        super(data);
        super.setHeaders(200,"OK",{"Content-Type": "text/css"});
    }
}

class SendJS extends Response{
    constructor(data){
        super(data);
        super.setHeaders(200,"OK",{"Content-Type": "text/javascript"});
    }
}

class SendIMG extends Response{
    constructor(data,format){
        super(data);
        super.setHeaders(200,"OK",{"Content-Type": `image/${format}`});
    }
}
module.exports = {Send200,Send400,Send404,Send405,Send406,Send413,Send500,SendJson,SendHTML,SendCSS,SendJS,SendIMG};