import styled from "styled-components"
import { motion } from "framer-motion"



// export const ListingContainer = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
//     align-items: center;
//     @media(max-width: 1200px){
//         margin: auto;    
//     }
// `



export const CardWrapper = styled.div`
  position: relative;
  margin: 2px;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 255px;
  height: 420px;

  
  @media (max-width: 500px) {
    width: calc(100% - 2px);
    height: auto; 

    &::before {
      content: '';
      display: block;
      padding-bottom: 133.3333%;  /* معادل 4/3 × 100% */
    }
  }
`;

// ۲. محتوای درونی کارت
export const CardInner = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;
  padding-top:3px;

  @media (max-width: 500px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-top:0px;
  }
`;



// export const Card = styled(motion.div)`
//     height:420px;
//     max-width:255px;
//     margin:2px;
//     background-color:#ffffff;
//     aspect-ratio: 3 / 4; 
//     border-radius:5px;
//     overflow: hidden;
//     cursor:pointer;
//     transition: all 0.3s ease-in-out; 
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
//     @media(max-width: 500px){
//         max-width: calc(100% - 2px);
//         aspect-ratio: 3 / 4; 
//     }
// `


export const CardMedia = styled(motion.div)`
    height: 220px;
    margin:15px 15px 1px 15px;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom:20px;



    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3));
    pointer-events: none;
  }

    img{
        width:100%;
        height:300px;
        object-fit:cover;
        transition: all .4s ease;

    }

`



export const Status = styled.span`
    font-size:1rem;
    font-weight:400;
    color: #fff;
    padding:3px 3px;
    position:absolute;
    display:flex;
    flex-direction:row;
    gap:1px;
    left:10px;
    bottom:5px;
`
export const Date = styled.span`
    font-size:12px;
    font-weight:400;
    color: #fff;
    padding:3px 3px;
    position:absolute;
    right:2px;
    top:2px;
    display:flex;
    flex-direction:row;
    gap:1px;
    align-items:center;
    justify-content:center;
  
`

export const PicLength = styled.span`
    display:flex;
    flex-direction:row;
    gap:1px;
    font-size:12px;
    font-weight:400;
    color: #fff;
    padding:3px 3px;
    position:absolute;
    left:2px;
    top:2px;
    align-items:center;
    justify-content:center;
  
`
export const CardBody = styled.div`
    padding: 4px 15px 15px 15px;

`
export const CardTitle = styled.div`
    display:flex;
    align-items: center;
    justify-content:flex-start;
    gap:5px;
    color:rgb(11, 11, 83);
    font-size:25px;
    margin-bottom:20px;
`

export const CardTitleInfo = styled.h5`
    background-color:#f1f1f1;
    padding:5px;
    color:var(--light-green);
    font-size:14px;  
`

export const MetaInfo = styled.div`
    height:auto;
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    gap:2px;
    margin-bottom:20px;
`


export const PriceInfo = styled.div`
    display:flex;
    width:fit-content;
    flex-direction:row;
    justify-content:flex-start;
    align-items:start;
    background-color:#f1f1f1;
    padding:2px;
    span{
        color:#3e3e3e;
        font-size:14px; 
        font-weight:600; 
    } 
`

export const Price = styled.h5` 
    display:flex;
`
export const PriceText = styled.div`
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: .3rem;
    color:#3e3e3e;
    font-weight:600;
`

export const TagsCta = styled(motion.div)`
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:1px;
`

export const Tags = styled.div`
    width: fit-content;
    padding: 0 7px;
    border-radius:6px;
    height:24px;
    line-height:24px;
    text-align:center;
    font-weight:bold;
    font-size:12px;
    background-color: #5142fc;
    text-transform: uppercase;
    cursor : pointer;
    &:hover{
        color:#fff;
    }

`

export const CtaGrp = styled.div`
    display: flex;

`

export const CtaLink = styled.a`
    width: fit-content;
    padding:0 6px;
    height:24px;
    line-height:24px;
    text-align: center;
    font-weight: bold;
    font-size: 12px;
    background-color: #474757;
    border-radius: 6px;
    text-transform: uppercase;
    margin-left:4px;
    transition: background-color .25s ease;
    cursor: pointer;
    z-index: 1;
    text-decoration: none;
    color: #fff;
    &:hover{
        color:#5142fc;
    }

`

export const MetaList = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
   
`

export const MetaListItem = styled.div`
    font-weight:500;
 
    color:rgb(11, 11, 83);
    font-size:12px;
    padding: 3px 0;

    &:not(:last-child){
        border-bottom: 1px solid #232332
    }
    
`