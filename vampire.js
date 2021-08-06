class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let counter = 0;
    let currentVampire = this
    while(currentVampire.creator) {
      currentVampire = currentVampire.creator;
      counter ++;
    }

    return counter;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    const selfAncestor = [];
    const otherAncestor = [];
    
    // Add yourself, and all your ancestors in
    // the array.
    let selfVal = this;
    while(selfVal) {
      selfAncestor.push(selfVal);
      selfVal = selfVal.creator;
    }

    // Do the same for the vampier you're checking
    let otherVal = vampire;
    while(otherVal) {
      otherAncestor.push(otherVal);
      otherVal = otherVal.creator;
    }

    // Use for loop to compare selfAncestor list against
    // the otherAncestor list. If the name matches, it means
    // that's the name of the common ancestor. WARNING! THIS
    // DOES NOT ACCOUNT FOR SITUATION WHERE ANCESTORS SHARE 
    // IDENTICAL NAME...

    for(let ancestor1 of selfAncestor){
      
      for(let ancestor2 of otherAncestor) {
        if(ancestor1.name === ancestor2.name) {
          return ancestor1;
        }
      }
    }

    return undefined;
  }
}

module.exports = Vampire;

