import React from 'react';
import Cell from '../Cell/Cell';
import './UserGrid.css'

class UserGrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: '',
            currentId:'',
            message: null,
            boat: [],
            counter:0,
            playerShips: [{ 'name': 'aircraftCarrier', 'length': 5, 'spaces': [] },
            { 'name': 'battleship', 'length': 4, 'spaces': [] },
            { 'name': 'cruiser', 'length': 3, 'spaces': [] },
            { 'name': 'submarine', 'length': 3, 'spaces': [] },
            { 'name': 'defender', 'length': 2, 'spaces': [] }],
            shipOccupied:[],
            currentShipAlignment:null,
            shipTileLaid:false,
        }
    }

    // componentDidMount(){
    //     this.refs.c.checkForShipTile()
    // }

    //This function is called by the render. It will look at the counter value to determine
    // if the user still needs to set their ship locations or if all the ship values have been set.
    //counter was added to state in order to access the different ships, counter is incremeneted in a later function
    //after a boat has been completely built.
    handleSetShips = () => {
        if(this.state.counter > 4){
            return `All Ships Have Been Set`
        } else {
            return `Please select cells for ${this.state.playerShips[this.state.counter].name}.
        This ship is ${this.state.playerShips[this.state.counter].length} spaces long`
        }
        
    }

    //this function is used as a callback function after updating the boat values in state. this will allow us to check and see if the
    //boat is finishe being built. if so it will update the playerShips in state with the values.
    handleCheckBoatLength = () => {
        if(this.state.boat.length === this.state.playerShips[this.state.counter].length){
            let currentShips = this.state.playerShips;
            currentShips[this.state.counter].spaces = this.state.boat
            this.setState({
                playerShips: currentShips,
                counter: this.state.counter + 1,
                boat: [],
                currentShipAlignment: null,
            })
        } 
    }

    //This function is called by render simply as a visual tool for the user to see which cells they have selected so far
    //for the respective boats. We may not need this later on, but is helpful to see which cells are representing the boat so far.
    displayBoats = () => {
        return this.state.playerShips.map((ship, index) => {
            return <li key={index}>{ship.name} : {ship.spaces.length !== 0 ? ship.spaces.map(space => space.value + ', ') : 'ship not built yet'}</li>
        })
    }

    // updateShipT=(idNum)=>{
    //     this.refs.c.updateShipTile(idNum)
    // }   

    handleCheckValue = (value, idNum) => {
        console.log(idNum);
        if(this.state.boat.length < this.state.playerShips[this.state.counter].length){
        if(this.state.boat.length === 0){
            this.setState({
                boat: [{value, idNum}],
                shipOccupied:[idNum],
                shipTileLaid:true,
            }, () => this.handleCheckBoatLength())
            //this.refs.c.updateShipTile(idNum)
            //this.updateShipT(idNum)
        }
        else {
            let lastIdNum = idNum;
            let firstIdNum = this.state.shipOccupied[0]
            let validHRangeHigh = 5 + firstIdNum > 100 ? 0 : 5 + firstIdNum;
            let validHRangeLow = (-5) + firstIdNum < 0 ? 0 : (-5) + firstIdNum;
            let validVRangeHigh = 50 + firstIdNum > 100 ? 100 : 50 + firstIdNum;
            let validVRangeLow = (-50) + firstIdNum < 0 ? 0 : (-50) + firstIdNum;
            let firstDigit = this.state.boat[0].value.charAt(0)
            let firstCurrentDigit = value.charAt(0)
            //console.log(firstDigit.charAt(0))
            //console.log(firstCurrentDigit.charAt(0))
            if(lastIdNum < validHRangeHigh && lastIdNum > validHRangeLow){
                if(((lastIdNum == firstIdNum + 1 ) || (lastIdNum == firstIdNum - 1)) && 
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 5) &&
                (this.state.currentShipAlignment !== 'vertical' )){
                    if(firstCurrentDigit.charAt(0)==firstDigit.charAt(0)){
                       // if()
                    //if((lastIdNum-1) % 10 !== 0){
                        this.setState({
                            boat:[...this.state.boat, {value, idNum}],
                            shipOccupied:[...this.state.shipOccupied, idNum],
                            currentShipAlignment:'horizontal'
                        }, () => this.handleCheckBoatLength())                  
                    } //this.state.currentShipAlignment !== 'horizontal'
                } else 
                if((lastIdNum == firstIdNum + 2 || lastIdNum == firstIdNum - 2) && 
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 5) &&
                (this.state.playerShips[this.state.counter].length > 2) && 
                (this.state.currentShipAlignment !== 'vertical' ) ) {
                    if(firstCurrentDigit.charAt(0)==firstDigit.charAt(0)){
                            this.setState({
                                boat:[...this.state.boat, {value, idNum}],
                                shipOccupied:[...this.state.shipOccupied, idNum],
                                currentShipAlignment:'horizontal'
                            }, () => this.handleCheckBoatLength())
                        }
                } else 
                if((lastIdNum == firstIdNum + 3 || lastIdNum == firstIdNum - 3) && 
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 5) && 
                (this.state.playerShips[this.state.counter].length > 3) &&
                (this.state.currentShipAlignment !== 'vertical' )) {
                    if(firstCurrentDigit.charAt(0)==firstDigit.charAt(0)){
                            this.setState({
                                boat:[...this.state.boat, {value, idNum}],
                                shipOccupied:[...this.state.shipOccupied, idNum],
                                currentShipAlignment:'horizontal'
                            }, () => this.handleCheckBoatLength())
                        }
                } else 
                if((lastIdNum == firstIdNum + 4 || lastIdNum == firstIdNum - 4) && 
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 5) && 
                (this.state.playerShips[this.state.counter].length > 4) &&
                (this.state.currentShipAlignment !== 'vertical' )) {
                    if(firstCurrentDigit.charAt(0)==firstDigit.charAt(0)){
                            this.setState({
                                boat:[...this.state.boat, {value, idNum}],
                                shipOccupied:[...this.state.shipOccupied, idNum],
                                currentShipAlignment:'horizontal'
                            }, () => this.handleCheckBoatLength())
                        }
                    }
            } else if(lastIdNum < validVRangeHigh && lastIdNum > validVRangeLow){
                if(((lastIdNum == firstIdNum + 10 ) || (lastIdNum == firstIdNum - 10)) &&
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 50) &&
                (this.state.currentShipAlignment !== 'horizontal')){
                        this.setState({
                            boat:[...this.state.boat, {value, idNum}],
                            shipOccupied:[...this.state.shipOccupied, idNum],
                            currentShipAlignment:'vertical'
                        }, () => this.handleCheckBoatLength())
                } else 
                if((lastIdNum == firstIdNum + 20 || lastIdNum == firstIdNum - 20) && 
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 50) &&
                (this.state.playerShips[this.state.counter].length > 2) && 
                (this.state.currentShipAlignment !== 'horizontal')) {
                        this.setState({
                            boat:[...this.state.boat, {value, idNum}],
                            shipOccupied:[...this.state.shipOccupied, idNum],
                            currentShipAlignment:'vertical'
                        }, () => this.handleCheckBoatLength())
                } else 
                if((lastIdNum == firstIdNum + 30 || lastIdNum == firstIdNum - 30) && 
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 50) && 
                (this.state.playerShips[this.state.counter].length > 3) &&
                (this.state.currentShipAlignment !== 'horizontal')) {
                        this.setState({
                            boat:[...this.state.boat, {value, idNum}],
                            shipOccupied:[...this.state.shipOccupied, idNum],
                             currentShipAlignment:'vertical'
                        }, () => this.handleCheckBoatLength())
                } else 
                if((lastIdNum == firstIdNum + 40 || lastIdNum == firstIdNum - 40) && 
                this.state.shipOccupied.indexOf(lastIdNum)==(-1) && 
                (Math.max(...this.state.shipOccupied) - lastIdNum < 50) && 
                (this.state.playerShips[this.state.counter].length > 4) &&
                (this.state.currentShipAlignment !== 'horizontal')) {
                        this.setState({
                            boat:[...this.state.boat, {value, idNum}],
                            shipOccupied:[...this.state.shipOccupied, idNum],
                            currentShipAlignment:'vertical'
                        }, () => this.handleCheckBoatLength())
                }
            }
        }
    }
        //this.refs.c.checkForShipTile()
    }

    handleSelectTarget = (value, idNum) => {
        this.handleCheckValue(value, idNum);
        this.setState({
            selected: value,
            //boat: [...this.state.boat, value],
            message: null,
            currentId: idNum
            //selected: idNum
        })
        //this.handleCheckValue(value, idNum);
    }

    findMyIndex = (letter, num) => {
        let temp = 0;
        switch (letter) {
            case ('A'):
                temp = num
                break;
            case ('B'):
                temp = num + 10
                break;
            case ('C'):
                temp = num + 20
                break;
            case ('D'):
                temp = num + 30
                break;
            case ('E'):
                temp = num + 40
                break;
            case ('F'):
                temp = num + 50
                break;
            case ('G'):
                temp = num + 60
                break;
            case ('H'):
                temp = num + 70
                break;
            case ('I'):
                temp = num + 80
                break;
            case ('J'):
                temp = num + 90
                break;
        }
        return temp
    }

    handleRenderGrid = () => {
        let counter = 0;
        //setting the rows and columns of the gameboard grid
        let y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let x = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        //map over the letters and for each letter return a 'column' div.
        //each 'column' div will have a style of 'display:inline-block' so that the
        // columns will align on the grid.
        return y.map((num, index) => {
            //counter++
            return (
                <div key={index} className='column'>
                    {/* These cells will be the top row of the grid and will have a letter for each cell*/}
                    <Cell id={num} label={true} />
                    {x.map((letter, index) => {
                        if (num === 0) {
                            // these cells will be the most left coulumn and will have the numbers listed in each cell.
                            return <Cell key={letter} id={letter} label={true} />
                        }
                        counter++
                        return <Cell key={letter + num}
                            id={letter + num}
                            idNumber={this.findMyIndex(letter, num)}
                            x={num}
                            y={letter}
                            handleSelectTarget={this.handleSelectTarget}
                            selected={this.state.selected}
                            shipTiles={this.state.shipOccupied}
                            currentId={this.state.currentId}
                            ref="c"
                        //hits={this.state.hits}
                        //misses={this.state.misses}
                        />
                    })
                    }
                </div>
            )
        })
    }

    render() {

        return (
            <div className='UserContainer'>
                <div className='UserGrid'>
                    {this.handleRenderGrid()}
                </div>
                <h2>{this.handleSetShips()} </h2>
                <h3>{this.displayBoats()}</h3>
            </div>

        )
    }
}

export default UserGrid;