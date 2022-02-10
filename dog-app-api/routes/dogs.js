const express = require('express');
const router = express.Router();
const axios = require('axios');

const headersOptions = {
	headers: {
		'x-api-key': process.env.API_KEY
	}
};

router.get("/", async (req, res) => {
  if(req.query.limit < 0) return res.status(400).json({ message: 'limit should be a positive number' });

  try {
    const response = await axios.get(
      `${process.env.API_URL}/images/search`,
      {
        params: {
          limit: req.query.limit,
          page: req.query.page,
          order: req.order,
        },
      }
    );
    const filteredData = response.data.filter((data) => data.breeds.length > 0).map((res) => {
      return {...res, name: res.breeds[0].name}
    });
  
    const voteRequest = await axios.get(
      `${process.env.API_URL}/votes`,
      headersOptions
    );
  
    const data = filteredData.map((data) => {
      const vote = voteRequest.data.filter((vote) => vote.image_id == data.id);
      if(vote.length) {
        return {...data, value: 1}
      } 
      return { ...data, value: 0 };
    })
    res.send(data);
    
  } catch (error) {
    res.send({ message: error });
  }
});

router.post("/vote", async (req, res) => {
  try {
    const response = await axios.post(
      `${process.env.API_URL}/votes`,
      req.body,
      headersOptions
    );
    res.send(response.data);
    
  } catch (error) {
    res.send({ message: error });
  }
});

router.delete('/vote/:id', async (req, res) => {
  try {
    const response = await axios.delete(
      `${process.env.API_URL}/votes/${req.params.id}`,
      headersOptions
    );
    res.send(response.data);
    
  } catch (error) {
    
  }
});

module.exports = router;