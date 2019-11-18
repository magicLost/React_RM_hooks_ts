import React, {useState} from 'react';
import classes from './ImgWithLoading.module.scss';
import Spinner from '../Spinner/Spinner';

export type SrcSet = {
    srcSet: string;
    media: string;
};

interface ImgWithLoadingProps  {
    alt: string;
    isActive: boolean;
    src: string;
    onImageClick?: (event: any) => void | undefined;
    index?: number;
    srcSets?: SrcSet[];
}

const ImgWithLoading = ({alt, isActive, src, onImageClick, index = 0, srcSets = []}: ImgWithLoadingProps) => {

    const [isLoad, setIsLoad] = useState(false);
    const [isError, setIsError] = useState(false);

    let image = null;
    let spinner = null;

    const onLoad = () => {

        console.log("Load Image");
        setIsLoad(true);

    };

    const onError = () => {

        console.log("Error Image");
        setIsError(true);

    };

    const getSpinner = () => {

        return (
            <div className={classes.Spinner}>
                <Spinner />
            </div>
        )

    };

    const getImageWithSrcSet = () => {

        const sources = srcSets.map((value, index) => {

            return (
                <source key={value.srcSet + index} media={value.media} srcSet={value.srcSet} />
            );

        });

        const image = getImageTag();

        return (
    
            <picture>

                { sources }

                { image }

            </picture>

        );

    };

    const getImageTag = () => {

        return <img data-index={index} onClick={onImageClick}  style={{visibility: isLoad ? 'visible' : 'hidden'}} onLoad={onLoad} onError={onError} src={src}  alt={alt} />;

    };

    /* RENDER */

    if(isActive === true){

        if(isError){

            image = <p>Oppps....</p>;

        }else{

            if(srcSets.length > 0){

                image = getImageWithSrcSet();
        
            }else{
        
                image = getImageTag();
            
            }

            spinner = isLoad ? null : getSpinner();

        }
        
    }    

    return (
        
        <div className={classes.ImgWithLoading}>

            { image }
            { spinner }

        </div>
            
    );
};

export default ImgWithLoading;
        