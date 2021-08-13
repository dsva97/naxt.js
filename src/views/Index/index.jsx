import './script'
import './style.css'
import { Button, BtnWarning } from '../../components'

const IndexView = () => {
    return (
        <div id="home">
            <h1>Hola mundo!</h1>
            <ul>
                <li>
                    <Button background="primary" radius="normal" color="white" size="sm">Click me!</Button>
                </li>
                <li>
                    <Button background="primary" radius="rounded" color="white" size="md">Click me!</Button>
                </li>
                <li>
                    <Button background="primary" radius="square" color="white" size="lg">Click me!</Button>
                </li>
                <li>
                    <Button background="primary" color="white" size="md">Click me!</Button>
                </li>
            </ul>
            
            {/* <BtnWarning>Click me!</BtnWarning> */}
        </div>
    )
}

export default IndexView