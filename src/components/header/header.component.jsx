import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown-logo.svg";
import './header.styles.scss';
import { connect } from 'react-redux';
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => (
    <div className='header'>
        <Link to="/">
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link to='/shop' className='option'>
                SHOP
            </Link>
            <Link to='/shop' className='option'>
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className='option' onClick={()=>auth.signOut()}>SIGN OUT</div>
                    :
                    <Link to='/signin' className='option'>SIGN IN</Link>
            }
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Header);
