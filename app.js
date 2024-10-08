import express from 'express'
import productsRoutes from './src/routes/productsRoutes.js'
import viewsRoutes from './src/routes/viewsRoutes.js'
import usersRoutes from './src/routes/usersRoutes.js'
import studentsRoutes from './src/routes/studentsRoutes.js'
import coursesRoutes from './src/routes/coursesRoutes.js'
import __dirname from './dirname.js'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/static',express.static(__dirname + '/public'))

app.engine('hbs',handlebars.engine({
    extname:'.hbs',
    runtimeOptions:{allowProtoPropertiesByDefault:true}
}))
app.set('view engine','hbs')
app.set('views',__dirname + '/src/views')

app.use('/api/products',productsRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/students',studentsRoutes)
app.use('/api/courses',coursesRoutes)
app.use('/',viewsRoutes)

mongoose.connect('mongodb+srv://ianbok2121:EYpToATaHMuScSaM@cluster0.0lhnb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
app.listen(PORT,()=> console.log(`server in port ${PORT}`))