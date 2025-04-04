class Trip {
    constructor(data) {
      this.isValid = true;
      this.startStation = stations.find( s => {
        return s.id === data.start_station_id 
      })
      this.endStation = stations.find( s => {
        return s.id === data.end_station_id 
      })
      
      if (!this.startStation || !this.endStation || 
        this.startStation.id === this.endStation.id) {
        this.isValid = false;
        console.log('trip is not valid', this);
        return;
      }

      this.startedTime = parseInt(data.st);
      this.endedTime = parseInt(data.et);
    }
  
    display(currentTime) {
      if (currentTime > this.startedTime && currentTime < this.endedTime) {
        const tripProgress = map(currentTime, 
            this.startedTime, this.endedTime, 0, 1);
        const pos = 
        this.startStation.getPos().lerp(
            this.endStation.getPos(), tripProgress);
       
        noStroke();
        
        fill(200,0,0);
        circle(pos.x, pos.y,10);
      }
    }
  }