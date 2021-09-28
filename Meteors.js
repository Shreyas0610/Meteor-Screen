import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

export default class MeteorScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            meteors: {},
        }
    }


    getMeteors = () => {
        axios
            .get("https://api.nasa.gov/neo/rest/v1/feed?api_key=eLlEfVfgFdlu0hKcSS3y65D0cpoxy80vzaiPwncu")
            .then(response => {
                this.setState({ meteors: response.data.near_earth_objects })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }

    componentDidMount() {
        this.getMeteors();
    }
    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            var meteorArray = Obejct.keys(this.state.meteors).map(meteor_Date => {
                return (
                    this.state.meteors[meteor_Date]
                )
            })
            var meteors = [].concat.apply([], meteorArray)
            meteors.forEach(function(element){
                var diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + element.estimated_diameter.kilometers.estimated_diameter_max) /2
                var threatScore = (diameter/element.close_approach_data[0].miss_distance.kilometers) *1000000000
                element.threat_score = threatScore;
            }
            );
            return (
                <View style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text>Meteor Screen!</Text>
                </View>
            )
        }
    }
}