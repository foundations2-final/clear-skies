import React, { Component } from 'react'
import ObservationItem from './ObservationItem.js'
import { getLookUp } from '../Utils/api-utils'
import './ObservationPage.css'
import { getObjArray } from '../Utils/local-storage-utils.js'

export default class ObservationPage extends Component {
    state = {
        observationList: [], 
        observationObjectList: []
    }
    componentDidMount = async () => {
        const observationList = getObjArray()
        await this.setState({observationList})
        await this.fetchLookUpData()
    }
    fetchLookUpData = async () => {
        let lookUpArray = [];
        for (const name of this.state.observationList) {
            const observationObject = await getLookUp(name, this.props.token)
            lookUpArray.push(observationObject)
        }
        this.setState({observationObjectList: lookUpArray})
    }
    render() {
        return (
            <div className = 'observation-list'>
                {this.state.observationObjectList.map(observationObject => <ObservationItem image={observationObject.image} name={observationObject.name} ra={observationObject.ra || 'N/A'} dec={observationObject.dec || 'N/A'}/>)}
            </div>
        )
    }
}
