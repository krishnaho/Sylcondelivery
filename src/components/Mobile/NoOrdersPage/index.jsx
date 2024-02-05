import React from 'react'
import boy from '../../../assets/images/no odersss.png'
import Footer from '../Footer'
   

// import limitzoText from '../../../assets/images/Limtzo-black.png'
function NoOrdersPage() {
  return (
    <div style={{minHeight:"100vh"}} className='bg-slate-50'>

          <div className='flex justify-between px-3 bg-white pb-3' style={{ padding: '15px 0 0 0' }}>
                <div style={{color:"#070648",fontWeight:"800"}}>New Orders</div>
                <div className='border text-white px-3 py-1' style={{backgroundColor:"#070648",borderRadius:"10px"}}>Refresh</div>
          </div>

          <div className='  mt-3 grow flex justify-center items-center relative'>
            <img className='absolute top-24' src={boy} alt='boy'/>
          </div>
          <Footer/>
    </div>
  )
}

export default NoOrdersPage