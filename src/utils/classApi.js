//asynchronous function to return all of the classes from dnd5eapi
const baseUrl = 'https://www.dnd5eapi.co'


export const getClasses = async () => {
    //account for errors
    try {
            // variable for the get request. wait for the response before continuing
            const response = await fetch(`${baseUrl}/api/classes`);
            // variable for the response in json. Wait for the data before continuing
            const data = await response.json();
            //extract the list of race names from the response:
            const classNames = data.results.map((className) => ({
                name: className.name,// store the classes name
                url: className.url // store the classes endpoint
            }));
            return classNames;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to get the class');
    }

};

// get class info
export const getClassInfo = async (classNameUrl) => {
    try {
        const response = await fetch(`${baseUrl}${classNameUrl}`)
        const data = await response.json()


        const classInfo = {
            hitDie: data.hit_die,
            proficiencyChoices: data.proficiency_choices.map(profChoices => {
                const options = profChoices.from.options ? profChoices.from.options : profChoices.from;
                return {
                    desc: profChoices.desc,
                    options: options.map(option => {
                        if (option.item) {
                            return {
                                name: option.item.name,
                                url: option.item.url,
                            };
                        } else {
                            return {
                                name: option.name,
                                url: option.url,
                            };
                        }
                    }),
                };
            }),
            proficiencies: data.proficiencies.map(prof => ({
                name: prof.name,
                url: prof.url
            })),
            savingThrows: data.saving_throws.map(savingThrow => ({
                name: savingThrow.name,
                url:  savingThrow.url
            })),
            startingEquipment: data.starting_equipment.map((starting) => ({
                name: starting.equipment.name,
                amount: starting.quantity,
                url: starting.equipment.url 
            })),
            startingEquipmentOptions: data.starting_equipment_options.map((equipChoices) => ({
                description: equipChoices.desc,
                options: equipChoices.from && equipChoices.from.options
                  ? equipChoices.from.options.map((selection) => {
                      let optionData;
              
                      if (selection.option_type === 'counted_reference') {
                        optionData = {
                          amount: selection.count,
                          name: selection.of.name,
                          url: selection.of.url, // description of item
                        };
                      } else if (selection.option_type === 'choice') {
                        optionData = {
                          description: selection.choice.desc,
                          amount: selection.choice.choose,
                          name: selection.choice.from.equipment_category.name,
                          url: selection.choice.from.equipment_category.url, // should open the url to choose which item to pick
                        };
                      } else if (!selection.option_type) {
                        optionData = {
                          description: selection.desc,
                          url: selection.url,
                        };
                      } else if (selection.option_type === 'multiple') {
                        optionData = selection.items.map((item) => {
                          if (item.option_type === 'choice') {
                            return {
                              description: item.choice.desc,
                              amount: item.choice.choose,
                              name: item.choice.from.equipment_category.name,
                              url: item.choice.from.equipment_category.url,
                            };
                          } else if (item.option_type === 'counted_reference') {
                            return {
                              amount: item.count,
                              name: item.of.name,
                              url: item.of.url,
                            };
                          } else {
                            return {
                              count: item.count,
                              name: item.of.name,
                              url: item.of.url,
                            };
                          }
                        });
                      }
              
                      return optionData;
                    })
                  : [],
              })),
              classLevelsUrl: data.class_levels,
        }
        return classInfo
    } catch (error) {
        console.error(error);
        throw new Error ('Failed to get class info')
    }
};

// get class level info
export const getClassLevel = async (classLevelUrl) => {
    try {
        const response = await fetch(`${baseUrl}${classLevelUrl}`)
        const dataArray = await response.json()

        const levelInfos = dataArray.map((data) => {
            const levelInfo = {
              className: data.class.name,  
              level: data.level,
              abilityScoreBonus: data.ability_score_bonuses,
              proficiencyBonus: data.prof_bonus,
              features: data.features.map((feature) => ({
                name: feature.name,
                url: feature.url,
              })),
              classSpecific: data.class_specific,
            };
      
            // Check for spells
            if (data.spellcasting) {
              levelInfo.spellcasting = {
                spellsKnown: data.spellcasting.spells_known || data.spellcasting.cantrips_known || 0,
                spellSlots: {
                  level1: data.spellcasting.spell_slots_level_1 || 0,
                  level2: data.spellcasting.spell_slots_level_2 || 0,
                  level3: data.spellcasting.spell_slots_level_3 || 0,
                  level4: data.spellcasting.spell_slots_level_4 || 0,
                  level5: data.spellcasting.spell_slots_level_5 || 0,
                  level6: data.spellcasting.spell_slots_level_6 || 0,
                  level7: data.spellcasting.spell_slots_level_7 || 0,
                  level8: data.spellcasting.spell_slots_level_8 || 0,
                  level9: data.spellcasting.spell_slots_level_9 || 0,
                },
              };
            }
      
            return levelInfo;
          });
          return levelInfos; 
        } catch (error) {
          console.error(error);
          throw new Error('failed to get class level info');
        }
    };

  


