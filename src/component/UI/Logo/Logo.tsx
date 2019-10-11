import React from 'react';
import classes from './Logo.module.scss';
import icons from "../../../static/icons/ICONS.svg";
        
interface LogoProps  {
    isHomepage: boolean,
    homepagePath?: string
}

const Logo = ({isHomepage, homepagePath}: LogoProps) => {

    console.log("render Logo");

    if(isHomepage){

        return (
            <div className={classes.Logo}>

                <svg
                    className={classes.Svg}
                    width="5"
                    height={"5"}
                    viewBox={"0 0 836 859.07"}
                >
                    <use  xlinkHref={ icons + "#logo" }/>
                </svg>

            </div>
        );

    }else{

        return (
            <a
                className={classes.Logo}
                href={homepagePath}
            >

                <svg
                    className={classes.Svg}
                    width="5"
                    height={"5"}
                >
                    <use  xlinkHref={ icons + "#logo" }/>
                </svg>

            </a>
        );

    }
};

export default Logo;
        