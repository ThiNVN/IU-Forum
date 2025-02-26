import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/register.css';
import './css/reglog-gradientbg.css'

interface AppState{
    animationClass: string;
}

class Application extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            animationClass: 'gradient'
        }
        this.changeState = this.changeState.bind(this);
    }

    changeState() {
        if (this.state.animationClass === 'gradient') {
            this.setState({
                animationClass: 'gradient paused'
            });
        } else {
            this.setState({
                animationClass: 'gradient'
            });
        }
    }
    render() {
        return (
            <div className={this.state.animationClass}>
                {/* <h1>Pure CSS3 Animated Gradient Background</h1>
                <button onClick={this.changeState}>Stop / Start</button> */}
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>

        );
    }
}

export default function Register() {
    return (
        <div className="register">
            <h1>Register</h1>
            <Application /> {}
            
        </div>
    );
}
