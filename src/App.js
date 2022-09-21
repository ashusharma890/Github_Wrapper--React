import React,{useState} from 'react';
import icon from './icon.jpeg';
import './App.css';

const App = () => {

    const [userName, setUserName] = useState('');
    const [resData, setResData] = useState('');
    const [repoData, setRepoData] = useState('');

    const handleUserNameInput = (e) => {
        setUserName(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userName);


     fetch('https://api.github.com/users/' + userName)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setResData(data);
    });
     fetch('https://api.github.com/users/' + userName+'/repos')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setRepoData(data);
    });
    
    setUserName('');
  }
    


  return (
    <>
      <div className='container'>
        <div className='title'>Enter GitHub User Name</div>
        <form onSubmit={handleSubmit} className='formCard'>
          <input type="text" onChange={handleUserNameInput} value={userName}/>
          <button>Submit</button>
        </form>

        {resData.message}

        {/* conditional rendering */}
        { resData && (resData.message !== 'Not Found') && (
            <div className='userDetailCard'>
              <div className='userDetailBody'>
                <p className='name'>{resData.name}</p>
                <em className='username'>{resData.login}</em>
                <div className='follow'>
                  <p>Followers : {resData.followers}</p>
                  <p>Following : {resData.following}</p>
                </div>
                <div className='profDetail'>
                   <p>🏢 {resData.company}</p> 
                   <p>🗒️ {resData.bio}</p> 
                  <p>🗒️ Total Repos = {resData.public_repos}</p>
                  <div className='repos'>
                  {/* {Array.isArray(repoData) ? (repoData).map(e => <p><li>{e.name}</li></p>) : null} */}
      
    {repoData.map(
        (e) => 
            <a href={e.html_url} className='repo' target='_blank' >
              {e.name}
            </a>
    )}

                  </div>
                  
                    
                </div>
              </div>
              <div className='userImage'>
                <img src={resData.avatar_url} alt="avatar"/>
              </div>
            </div>
          )
        }

      </div>
    </>
  );
}

export default App