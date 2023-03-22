import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { COURSE_STACK, TCourse, TStudents } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


app.get("/courses", (req: Request, res: Response) => {
    res.status(200).send(courses)
})

app.get("/courses/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = q ?
        courses.filter(item => item.name.toLowerCase().includes(q.toLowerCase()))
        :
        courses

    res.status(200).send(result)
})

app.post("/courses", (req: Request, res: Response) => {
    const id: string = req.body.id
    const name: string = req.body.name
    const lessons: number = req.body.lessons
    const stack: COURSE_STACK = req.body.stack

    const newCourse: TCourse = {
        id, name, lessons, stack
    }

    courses.push(newCourse)
    console.log("Cursos", courses)
    res.status(201).send("Curso criado com sucesso")
})

app.get("/students", (req: Request, res: Response) => {
    res.status(200).send(students)
})

app.get("/students/search", (req: Request, res: Response) => {
    const q = req.query.q as string

    const result = q ?
    students.filter((item) => {
        return item.name.toLowerCase().includes(q.toLowerCase())
    })
    :
    students

    res.status(200).send(result)
})

app.post("/students", (req: Request, res: Response) => {

    const id: string = req.body.id
    const name: string = req.body.name
    const age: number = req.body.age

    const newStudents: TStudents = {
        id, name, age
    }

    students.push(newStudents)
    console.log("Students", students)
    
    res.status(201).send("Estudante cadastrado com sucesso")
})