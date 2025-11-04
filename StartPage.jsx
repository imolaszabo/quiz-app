export default function StartPage(props) {
    return(<>
            
            <h1 id="title">Quizzical</h1>
            <p>A fun game to test your knowlegde.</p>
            <button id="start-button" onClick={props.startQuiz}>Start quiz</button>
        </>
        )
}