import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.3)',
    background: '#000000',
    color: '#ffffff',
    overflowX: 'auto',  // Permet le défilement horizontal si nécessaire
    width: '100%'
  }));
  
  const ValueCell = styled(Typography)({
    padding: '8px',
    textAlign: 'center',
    whiteSpace: 'nowrap',  // Empêche le texte de passer à la ligne
    overflow: 'hidden',    // Cache le débordement
    textOverflow: 'ellipsis',  // Ajoute des points de suspension si le texte est trop long
    '&.yellow': {
      color: '#ffff00',
    },
})

interface DisplacementProps {
  density: number;
  draftSup: number;
  quarterMean: number;
  draftInf: number;
}

const Displacement: React.FC<DisplacementProps> = ({
  density,
  draftSup,
  quarterMean,
  draftInf,
}) => {
  return (
    <StyledPaper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="h6">DISPLACEMENT</Typography>
            </Grid>
            <Grid item xs={6} >
              <Typography variant="h6" align="right" id="density">
                Densité (Table): {density}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

         {/* Header Row */}
         <Grid item xs={12}>
          <Grid container wrap="nowrap">
            <Grid item xs={2}>
              <ValueCell>Interpolation</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell>Draft</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell>Displacement</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell>TPC</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell>LCF</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell>MTC+50</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell>MTC-50</ValueCell>
            </Grid>
          </Grid>
        </Grid>

        {/* Draft Sup Row */}
        <Grid item xs={12}>
          <Grid container wrap="nowrap">
            <Grid item xs={2}>
              <ValueCell>Draft Sup</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id="draftSup">{Number(quarterMean.toFixed(0)) + 0.1}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='displacementSup'>
                {'5532'}
              </ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='tpcSup'>{'16.67'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='lcfSup'>{'-3.65'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='mtcPlus50Sup'>{'59.67'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='mtcMinus50Sup'>{'76.27'}</ValueCell>
            </Grid>
          </Grid>
        </Grid>

        {/* Quarter Mean Row */}
        <Grid item xs={12}>
          <Grid container wrap="nowrap">
            <Grid item xs={2}>
              <ValueCell>Quarter mean</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='quarterMean'>{Number(quarterMean.toFixed(2))}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='displacement'>
                {"XXX"}
              </ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='tpc'>{'XX.XX'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='lcf'>{'X.XX'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='mtcPlus50'>{'XX.XX'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='mtcMinus50'>{'X.XX'}</ValueCell>
            </Grid>
          </Grid>
        </Grid>

        {/* Draft Inf Row */}
        <Grid item xs={12}>
          <Grid container wrap="nowrap">
            <Grid item xs={2}>
              <ValueCell>Draft Inf</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='draftInf'>{Number(quarterMean) - 0.5}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='displacementInf'>
                {"5389"}
              </ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='tpcInf'>{'16.27'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='lcfInf'>{'-2.4'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='mtcPlus50Inf'>{'53.6'}</ValueCell>
            </Grid>
            <Grid item xs={2}>
              <ValueCell className="yellow" id='mtcMinus50Inf'>{'63.05'}</ValueCell>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default Displacement;