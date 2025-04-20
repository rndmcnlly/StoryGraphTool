class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); //this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");

        this.engine.keyItem = false;
        this.engine.lockItem = false;
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); //the initial location of the story, goes to the scene that is in the choice
    }
}

class Location extends Scene {
    create(key) {
        //
        //current mess - the "The End" buttion shows in the "Door" scene. fix: unknown
        //
        let locationData = this.engine.storyData.Locations[key]; //`key` to get the data object for the current story location
        this.engine.show(locationData.Body); //shows the body text of each scene

        //check: at the door scean if the key item and the lock item are true go to the next area
        //else = when the player has nothing and can't open the door
        if(key == "Try"){
            if(this.engine.keyItem == true && this.engine.lockItem == true){
                this.engine.gotoScene(Location, "Puzzle");
            }
            else{
                this.engine.show("You don't have the right items with you");
                this.engine.gotoScene(Location, "Door");
            }

        }
        
        if(locationData.Choices && locationData.Choices.length > 0) { //checks if the location has any Choices
            for(let choice of locationData.Choices) { //loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); //use the Text of the choice
            }

            
        } else {
            this.engine.addChoice("The end.")
        }
        
    }

    handleChoice(choice) {
        if(choice) {

            //when in the right scene, change the item to ture - means that the item was collected
            if(choice.Target == "Pick Key"){
                this.engine.keyItem = true;
            }
            if(choice.Target == "Pick Lock"){
                this.engine.lockItem = true;
            }

            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } 
        else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');