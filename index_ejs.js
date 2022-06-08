(async()=>{
const express =  require('express')
const app = express()
const db =require("./db.js")
const port = 8080
const url = require("url")


app.set("view engine","ejs")

app.use(express.static('projetoGrupo3-Outliers'))
app.use("/imagens",express.static("imagens"))
app.use("/css",express.static("css"))
app.use("/js",express.static("js"))
app.use("/administrador",express.static("administrador"))
app.use("/Banco de Dados",express.static("Banco de Dados"))

const consulta = await db.selectFilmes()   
console.log(consulta[0])

app.get("/",(req,res)=>{
    res.render(`index`,{filme:consulta})
})

app.get("/cadastro",(req,res)=>{
    res.render(`cadastro`)
})

app.get("/carrinho",(req,res)=>{
    res.render(`carrinho`)
})

app.get("/contato",(req,res)=>{
    res.render(`contato`)
})

app.get("/login",(req,res)=>{
    res.render(`login`)
})

app.get("/perfilUsuario",(req,res)=>{
    res.render(`perfilUsuario`)
})

app.get("/produtos",(req,res)=>{
    res.render(`produtos`,{produto:consulta})
})

app.get("/promocoes",(req,res)=>{
    res.render(`promocoes`)
})

app.get("/single-preferencia",(req,res)=>{
    res.render(`single-preferencia`)
})

app.get("/single-produto",async(req,res) => {
    let infoUrl = req.url
    let urlProp = url.parse(infoUrl,true) // ?id=5
    let q = urlProp.query
    const consultaSingle = await db.selectSingle(q.id)
    const consultaInit = await db.selectSingle(4)


    res.render(`single-produto`, {
        titulo:"Conheça nossos livros", 
        promo:"Todos os livros com 10%OFF !",
        livro: consulta,
        galeria: consultaSingle,
        inicio: consultaInit
        })
})

app.get("/admin/cadastroAdmin",(req,res)=>{
    res.render(`admin/cadastroAdmin`)
})

app.get("/admin/cadastroProduto",(req,res)=>{
    res.render(`admin/cadastroProduto`)
})

app.get("/admin/indexAdmin",(req,res)=>{
    res.render(`admin/indexAdmin`)
})

app.get("/admin/loginAdmin",(req,res)=>{
    res.render(`admin/loginAdmin`)
})

app.get("/admin/relatorio-chamada",(req,res)=>{
    res.render(`admin/relatorio-chamada`)
})

app.get("/admin/relatorioComercial",(req,res)=>{
    res.render(`admin/relatorioComercial`)
})


app.listen(port,()=> console.log("Servidor rodando com nodemon!"))

})()
