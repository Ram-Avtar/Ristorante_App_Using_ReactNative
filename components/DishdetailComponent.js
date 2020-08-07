import React, { Component } from 'react';
import { Text, View , ScrollView , StyleSheet,Button, FlatList,SafeAreaView,Modal} from 'react-native';
import { Card , Icon,Rating,Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite,postComment,addComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';



const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites:state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    addComment: (dishId, rating, comment, author) => dispatch(addComment(dishId, rating, comment, author)),
    postComment: (dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))


})



function RenderDish(props) {


    const dish = props.dish;

        if (dish != null) {
            return(
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl+dish.image}}>
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                <View style={{alignSelf:'center', flex:1, flexDirection:'row'}}>
                <Icon
                    raised
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />

                    <Icon
                    raised
                    reverse
                    name={ 'pencil'}
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.onSelect()}
                    />
                   </View> 
                
            </Card>
            </Animatable.View>
            );
        }
        else {
            return(
                <View></View>
                );
        }
}

function RenderComments(props) {

    const comments = props.comments;

    const renderCommentItem = ({item, index}) => {

        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Rating style={{alignItem:'left'}} imageSize={15} readonly startingValue={item.rating} />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>        
        <Card title='Comments' >
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
        </Animatable.View>
    );
}

class DishDetail extends Component {

constructor(props) {
        super(props);

        this.state = {
            rating: 1,
            author:'',
            comment:'',
            showModal:false
        }
    }
toggleModal() {
        this.setState({showModal: !this.state.showModal})
    }

    handleComments(dishId) {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
    }



    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                    onSelect={()=>this.toggleModal(dishId)}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)}
                    
                    />

                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <View>
                        <Rating 
                                showRating
                                fractions={1}
                                startingValue={3}
                                onFinishRating={(rating)=>this.setState({rating:rating})}

                                 />
                            </View>
                            <View>
                        <Input
                              placeholder='Author'
                              leftIcon={
                                <Icon
                                  name='user-o'
                                  type='font-awesome'
                                  size={24}
                                  color='black'
                                  
                                />
                              }
                              onChangeText={(value) => this.setState({ author: value })}
                            />
                            </View>
                            <View>
                            <Input
                              placeholder='Comment'
                              leftIcon={
                                <Icon
                                  name='comment-o'
                                  type='font-awesome'
                                  size={24}
                                  color='black'
                                />
                              }
                            onChangeText={(value) => this.setState({ comment: value })}

                            />  

                            </View>
                            <View>                      
                        
                        <Button 
                            
                            onPress = {() =>{this.handleComments(dishId)}}
                            color="#512DA8"
                            title="Sunmit" 
                            />
                            </View>
                            <View>
                            <Button 
                            style={styles.button} 
                            onPress = {() =>{this.toggleModal()}}
                            color="#595959"
                            title="Cancel" 
                            />
                            </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}


const styles=StyleSheet.create({
     modal: {
       justifyContent: 'center',
       margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    button:{
        marginTop:20,
    }

})
export default connect(mapStateToProps,mapDispatchToProps)(DishDetail);
