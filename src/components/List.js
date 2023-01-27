import React, {useEffect, useState} from 'react'
import Button from "react-bootstrap/cjs/Button";

const List = ({allDataIn,setAllDataIn,mp, dataUser,  setEmailData,  setShowFindForm, setShowEmailForm, clientId,}) => {
    const [batch, setBatch]= useState([])
    const [tweet, setTweet] = useState(``)
    const [checkBox0,setCheckBox0] = useState([])
    const [checkBox1,setCheckBox1] = useState([])
    const [checkBox2,setCheckBox2] = useState([])
    const [checkBox3,setCheckBox3] = useState([])
    const [checkBox4,setCheckBox4] = useState([])
    const [repTwitter0,setRepTwitter0] = useState([])
    const [repTwitter1,setRepTwitter1] = useState([])
    const [repTwitter2,setRepTwitter2] = useState([])
    const [repTwitter3,setRepTwitter3] = useState([])
    const [repTwitter4,setRepTwitter4] = useState([])


    const fetchData = async () => {
        const requestOptions = {
            method: 'POST',
            redirect: 'follow'
        }
        const data = await fetch(`https://payload-demo-tpm.herokuapp.com/tweets/?clientId=${clientId}`, requestOptions);
        const datos = await data.json()
        console.log(datos.data, 'datos.data-tweet')
        const textoTweet = datos.data?.docs[0] ? datos.data?.docs[0].Message : 'Por favor introduzca un mensaje de twitter para los representantes en ele dashboard'
        setTweet(textoTweet)
    }
    
    useEffect(() => {
        fetchData()
        .catch((error)=>console.error(error))
        
        console.log(tweet, 'tweet state en useeffect')
    },[])
    const tweetText = `${repTwitter0} ${repTwitter1} ${repTwitter2} ${repTwitter3} ${repTwitter4} ${tweet}`
    console.log(tweetText)

 const click = e => {
        e.preventDefault()
        setAllDataIn([
            ...checkBox0,
            ...checkBox1,
            ...checkBox2,
            ...checkBox3,
            ...checkBox4,
        ])
        setShowEmailForm(false)
        setShowFindForm(true)
    } 
    const checkBox0Handled = e => {
        if (e.target.checked === true) {
            
          setCheckBox0([
            e.target.value
          ])
          setRepTwitter0([
            e.target.name
          ])
        } else {
            console.log('HEREFalse!')
           setCheckBox0([])
           setRepTwitter0([])
        }
    }
    const checkBox1Handled = e => {
        if (e.target.checked === true) {
            
          setCheckBox1([
            e.target.value
          ])
          setRepTwitter1([
            e.target.name
          ])
        } else {
            console.log('HEREFalse!')
           setCheckBox1([])
           setRepTwitter1([])
        }
    }
    const checkBox2Handled = e => {
        if (e.target.checked === true) {
            
          setCheckBox2([
            e.target.value
          ])
          setRepTwitter2([
            e.target.name
          ])
        } else {
            console.log('HEREFalse!')
           setCheckBox2([])
           setRepTwitter2([])
        }
    }
    const checkBox3Handled = e => {
        if (e.target.checked === true) {
            
          setCheckBox3([
            e.target.value
          ])
          setRepTwitter3([
            e.target.name
          ])
        } else {
            console.log('HEREFalse!')
           setCheckBox3([])
           setRepTwitter3([])
        }
    }
    const checkBox4Handled = e => {
        if (e.target.checked === true) {
            
          setCheckBox4([
            e.target.value
          ])
          setRepTwitter4([
            e.target.name
          ])
        } else {
            console.log('HEREFalse!')
           setCheckBox4([])
            setRepTwitter4([])
        }
    }
 useEffect(() => {
        console.log(allDataIn)
    },[allDataIn])
    return (
        <div>
            <div>
                <div>
                    <h3 className='capitalize-style'> {mp[0].name} {mp[0].lastName}</h3>
                    <p>Código Postal: {mp[0].postalcode}, Estado: {mp[0].state ? mp[0].state : ' ---'}, Fracción:{mp[0].party ? mp[0].party: ' ---'}</p>
                </div>
                
                <input name={mp[0].twitter} type="checkbox" value={mp[0].contact} onClick={checkBox0Handled} id={0} />
            </div>
            <div>
                <div>
                    <h3 className='capitalize-style'> {mp[1].name} {mp[1].lastName}</h3>
                    <p>Código Postal: {mp[1].postalcode}, Estado: {mp[1].state ? mp[1].state : ' ---'}, Fracción:{mp[1].party ? mp[1].party: ' ---'}</p>
                </div>
                <input name={mp[1].twitter} type="checkbox" value={mp[1].contact} onClick={checkBox1Handled} id={1} />
                <div>
                <div>
                    <h3 className='capitalize-style'> {mp[2].name} {mp[2].lastName}</h3>
                    <p>Código Postal: {mp[2].postalcode}, Estado: {mp[2].state ? mp[2].state : ' ---'}, Fracción:{mp[2].party ? mp[2].party: ' ---'}</p>
                </div>
                
                <input name={mp[2].twitter} type="checkbox" value={mp[2].contact} onClick={checkBox2Handled} id={2} />
            </div>
            <div>
                <div>
                    <h3 className='capitalize-style'> {mp[3].name} {mp[3].lastName}</h3>
                    <p>Código Postal: {mp[3].postalcode}, Estado: {mp[3].state ? mp[3].state : ' ---'}, Fracción:{mp[3].party ? mp[3].party: ' ---'}</p>
                </div>
                <input name={mp[3].twitter} type="checkbox" value={mp[3].contact} onClick={checkBox3Handled} id={3} />
            </div>
            <div>
                <div>
                    <h3 className='capitalize-style'> {mp[4].name} {mp[4].lastName}</h3>
                    <p>Código Postal: {mp[4].postalcode}, Estado: {mp[4].state ? mp[4].state : ' ---'}, Fracción:{mp[4].party ? mp[4].party: ' ---'}</p>
                </div>
                <input name={mp[4].twitter} type="checkbox" value={mp[4].contact } onClick={checkBox4Handled} id={4} />
            </div>
            </div>
            <div className={'buttons'}>
                <div >
                    
                        <Button
                            className='list-button'
                            size={'m'}
                            variant={'dark'}
                            href={`https://twitter.com/intent/tweet?text=${tweetText}`}
                            target={"blank"}
                        >
                            Enviar tweet
                        </Button> 
                    
                </div>
                <div >
                    
                      
                            <Button
                                className='list-button'
                                size={'m'}
                                variant={'dark'}
                                target={"blank"}
                                onClick={click}
                            >
                                Enviar email
                            </Button>  
                </div>
                
            </div>
        </div>
        
        
    )
}

export default List;


