const express = require('express')
const router = express.Router()
const Question = require('./models/questions')

// get all quiz questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find()
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// get one quiz question
router.get('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.findOne({ _id })
        if (!question) {
            return res.status(404).json({})
        } else {
            return res.status(200).json(question)
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// create one quiz question
router.post('/questions', async (req, res) => {
    try {
        const { question, options, correctOption } = req.body

        const newQuestion = await Question.create({
            question, options, correctOption
        })

        return res.status(201).json(newQuestion)
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// update one quiz question
router.put('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const { question, options, correctOption } = req.body

        let questionExists = await Question.findOne({ _id })

        if (!questionExists) {
            const newQuestion = await Question.create({
                question, options, correctOption
            })
            return res.status(201).json(newQuestion)
        } else {
            questionExists.question = question
            questionExists.options = options
            questionExists.correctOption = correctOption
            await questionExists.save()
            return res.status(200).json(questionExists)
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// delete one quiz question
router.delete('/questions/:id', async (req, res) => {
    try {
        const _id = req.params.id

        const question = await Question.deleteOne({ _id })

        if (question.deletedCount === 0) {
            return res.status(404).json()
        } else {
            return res.status(204).json({ question })
        }
    } catch (error) {
        return res.status(500).json({ "error": error })
    }
})

// this one is just a test
router.get('/', (req, res) => {
    res.send('H3ll0 W0RlD')
})


module.exports = router