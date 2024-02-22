
const AdventurerType = `
  type AdventurerType {
    """Adventurer Name"""
    name: String
    
    """x position"""
    x: Int
    
    """y position"""
    y: Int
    
    """Adventurer Orientation"""
    orientation: String

    """Adventurer Mvt Sequence"""
    sequence: [String]

    """Collected Treasure Number"""
    treasureCount: Int
  }
`;

export default AdventurerType;
