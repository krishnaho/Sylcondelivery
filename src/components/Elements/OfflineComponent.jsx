import { Component } from 'react'
import { connect } from 'react-redux'
import image from '../../assets/images/offline.png'

export class OfflineComponent extends Component {
    render() {
        return (
            <div className='d-flex flex-column align-items-center pt-5' style={{ height: '100vh' }}>
                <div className='mt-5 pt-5 d-flex flex-column align-items-center'>
                    <img src={image} alt="no items" style={{ objectFit: 'cover', width: '80%' }} />
                </div>
                <span className='mt-0 fs-6' style={{ fontWeight: '700' }}>You are Offline!!!</span>
                <span className='mt-0 fs-6' style={{ fontWeight: '600' }}>Connect to a network to Continue.....</span>
            </div>)
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(OfflineComponent)
