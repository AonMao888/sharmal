const express = require("express");
const {createClient} = require('@supabase/supabase-js');
const ejs = require('ejs');
const app = express();
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhbHdpYmJuZWRtZnp6aHF0dXF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAzNjgxMDUsImV4cCI6MjAxNTk0NDEwNX0.c0CCF50vux3GKvR70ONdZ4E-yjfLu_vgazK0k-LZyN0';
const url = 'https://walwibbnedmfzzhqtuqz.supabase.co';

app.set('views',__dirname+'/views');
app.set('view engine','ejs');
const supabase = createClient(url,key);

//listen file from internel
app.get('/home.css',(req,res)=>{res.sendFile(__dirname+'/assets/css/home.css')})
app.get('/job.css',(req,res)=>{res.sendFile(__dirname+'/assets/css/alljob.css')})
app.get('/tlogo',(req,res)=>{res.sendFile(__dirname+'/assets/img/telegram_logo.png')})
app.get('/chatpng',(req,res)=>{res.sendFile(__dirname+'/assets/img/chat.png')})
app.get('/speaker',(req,res)=>{res.sendFile(__dirname+'/assets/img/speaker.png')})

//listen home page
app.get('/',(req,res)=>{
    res.render('home');
})

//listen all jobs page
app.get('/jobs',async(req,res)=>{
    const {data,error} = await supabase.from('jobs').select('*');
    res.render('jobs',{all:data});
})

//listen get specific job page
app.get('/jobs/:id',async(req,res)=>{
    const {data,error} = await supabase.from('jobs').select().eq('jobid',req.params.id);
    if(data == null){
        res.send("Are you visit correct link")
    }else{
        res.render('view',{all:data});
    }
})

//listen post methos from search bar
app.get('/search',async(req,res)=>{
    const q = req.query.q;
    const gender = req.query.gender;
    const region = req.query.region;
    const {data,error} = await supabase.from('jobs').select().ilike('title',`%${q.toLowerCase()}%`);
    //let got = await data.find((item)=>item.title===q.toLowerCase());
    if(data){
        res.render('search',{all:data,q:q})
        console.log(data)
    }else{
        res.send("no job found")
    }
})

app.listen(80,()=>{console.log("server started with port 80")});