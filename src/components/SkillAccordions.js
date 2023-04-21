import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { getSkills, getSkillInfo } from '../utils/skillApi';
import CustomCheckBox from './CustomCheckBox';
import { FlexEndBox } from './CustomBoxes';

const Accordion = styled(({...props}) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled(({...props}) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function SkillAccordions({ skillName }) {
  const [expanded, setExpanded] = React.useState(false);
  const [skillInfo, setSkillInfo] = useState(null)
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const fetchSkills = async () => {
      const fetchedSkills = await getSkills();
      setSkills(fetchedSkills);
    };
  
    fetchSkills();
  }, []);

  useEffect(() => {
    const fetchSkillInfo = async () => {
        if (skillName) {
            const formattedSkillName = skillName.replace('Skill: ', '').toLowerCase()
            const skill = skills.find((s) => s.name.toLowerCase() === formattedSkillName);
            
            if (skill) {
                const fetchedSkillInfo = await getSkillInfo(skill.url);
                setSkillInfo(fetchedSkillInfo);
            }
        }
    }

    fetchSkillInfo()
}, [skillName, skills])

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      {skillInfo && (
         <>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
         aria-controls="panel1d-content" 
         id="panel1d-header"
         >
        <Typography>{skillInfo.name}</Typography>
        <FlexEndBox>
        <CustomCheckBox />
        </FlexEndBox>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {skillInfo.description}
              <br></br>
              {skillInfo.abilityScore}
            </Typography>
          </AccordionDetails>
      </Accordion>
      </>
      )}
    </div>
  );
}