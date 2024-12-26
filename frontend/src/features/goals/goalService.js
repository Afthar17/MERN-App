import axios from 'axios';

const API_URL = '/api/goals/';

// Create a goal
const createGoal = async (goalData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.post(API_URL, goalData, config)
  
    return response.data
  }


// Fetch all goals
const fetchGoals = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
  
    return response.data
  }
  


const goalService = {
    createGoal,
    fetchGoals,
};

export default goalService;
