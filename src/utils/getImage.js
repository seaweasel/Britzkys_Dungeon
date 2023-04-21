export  function getRaceImage(raceName) {

    switch (raceName.toLowerCase()) {
        case 'gnome':
            return '/images/gnome.jpg'
        case 'human':
            return '/images/human.jpg'
        case 'elf':
            return '/images/elf.jpg'
        case 'half-orc':
            return '/images/half-orc.jpg'
        case 'dwarf':
            return '/images/dwarf.jpg'
        case 'half-elf':
            return '/images/half-elf.jpg'
        case 'halfling':
            return '/images/halfling.jpg'
        case 'tiefling':
            return '/images/tiefling.jpg'
        case 'dragonborn':
            return '/images/dragonborn.jpg'
    }
}

export function getClassImage(className) {
    console.log(className)
    switch(className.toLowerCase()) {
        case 'barbarian':
            return '/images/barbarian.jpg'
        case 'bard':
            return '/images/bard.jpg'
        case 'cleric':
            return '/images/cleric.jpg' 
        case 'druid':
            return '/images/druid.jpg'
        case 'fighter':
            return '/images/fighter.jpg'
        case 'monk':
            return '/images/monk.jpg'
        case 'paladin':
            return '/images/paladin.jpg'
        case 'ranger':
            return '/images/ranger.jpg'
        case 'rogue':
            return '/images/rogue.jpg'
        case 'sorcerer':
            return '/images/sorcerer.jpg'
        case 'warlock':
            return '/images/warlock.jpg'
        case 'wizard':
            return '/images/wizard.jpg'
    }
}

