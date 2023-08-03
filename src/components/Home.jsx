import '../App.css'
import Category from './Category'

const Home = () => {
    return (
        <div>
            <div className='heading'>
                <span>Welcome to &nbsp;<i style={{ color: 'white' }}>i</i>&nbsp; Quiz</span>
            </div>
            <div className="cat-dropdown">
                <Category />
            </div>
        </div>
    )
}

export default Home
