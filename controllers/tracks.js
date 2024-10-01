const express = require('express')
const router = express.Router()

const TrackModel = require('../models/track')

//Index
router.get('/', async function(req, res) {
    try{
        const allTracks = await TrackModel.find({})
        res.status(200).json(allTracks)
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

//Create
router.post('/', async function(req, res) {
    try{
        const createdTrack = await TrackModel.create(req.body)
        res.status(201).json(createdTrack)
    } catch(err) {
        console.log(err)
        res.status(500).json({error: err.message})
    }
})

//Show
router.get('/:trackId', async function(req, res) {
        const foundTrack = await TrackModel.findById(req.params.trackId)
    try{
        if(!foundTrack) {
            res.status(404)
            throw new Error('Track not found');
        }

        res.status(200).json(foundTrack)
    } catch(err) {
        if(res.statusCode === 404) {
            res.json({error: err.message})
        }

        res.status(500).json({error: err.message})
    }
})

//Update
router.put('/:trackId', async function (req, res) {
    try{
        const updatedTrack = await TrackModel.findByIdAndUpdate(req.params.trackId, req.body, {new: true})

        if(!updatedTrack) {
            res.status(400)
            throw new Error('Track not found')
        }
        res.status(200).json(updatedTrack)
    } catch(err) {
        if(res.statusCode === 404) {
            res.json({error: err.message})
        }

        res.status(500).json({error: err.message})
    }
})

//Delete
router.delete('/:trackId', async function(req, res) {
    try{
        const deletedTrack = await TrackModel.findByIdAndDelete(req.params.trackId)
        if(!deletedTrack) {
            res.status(400)
            throw new Error('Pet not found')
        }
    } catch(err) {
        if(res.statusCode === 404) {
            res.json({error: err.message})
        }

        res.status(500).json({error: err.message})
    }
})

module.exports = router