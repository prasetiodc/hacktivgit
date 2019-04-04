const axios = require('axios')

let ax = axios.create({
  baseURL: 'https://api.github.com'
})

ax.defaults.headers.common['Authorization'] = `token ${process.env.GITHUB_TOKEN}`

class UserController{
  static getRepoStar(req, res){
    ax
      .get('/user/starred')
      .then(({data})=>{
        res.status(201).json(data)
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static createRepo(req, res){
    ax
      .post('/user/repos', {
        name: req.body.name,
        description: req.body.description
      })
      .then(({data})=>{
        res.status(201).json(data)
      })
      .catch(err=>{
        res.status(500).json(err)
      })
  }

  static searchRepoStar(req, res){
    ax
    .get('/user/starred')
    .then(({data}) => {
        let regex = new RegExp(req.params.nameRepo)
        let datas = data.filter(el=>regex.test(el.name))
        
        res.status(200).json(datas)
    })
    .catch(err => {
        res.status(500).json(err)
    })
  }

  static searchRepo(req, res){
    ax
    .get(`/users/${req.params.user}/repos`)
    .then(({data})=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static deleteStar(req, res){
    ax
    .delete(`/user/starred/${req.params.owner}/${req.params.repo}`)
    .then(({data})=>{
      res.status(200).json(data)
    })
    .catch(err=>{      
      res.status(500).json(err)
    })
  }
}

module.exports = UserController