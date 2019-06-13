import React from "react";
import { withStyles } from "@material-ui/core/styles";
import defaultStyles from "../../../defaultStyles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MarkChip from "../../common/table/MarkChip";
import TagChip from "../../common/table/TagChip";

const styles = theme => {
  return {
    ...defaultStyles(theme),
    card: {
      width: "100%",
      margin: theme.spacing.unit
    },
    cardRow: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-around"
    },
    cardColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
      //width: '33%',
    },
    chip: {
      margin: theme.spacing.unit
    }
  };
};

class SealValidationCard extends React.Component {
  useExistingSeal = () => {
    const { handleNext, formData, seal } = this.props;
    const updatedObservation = {
      ...formData,
      tags: seal.tags,
      sex: seal.sex,
      marks: seal.marks
    };
    handleNext(updatedObservation);
  };

  render() {
    const { seal, classes, maxScore } = this.props;
    return (
      <Card
        className={classes.card}
        style={{
          backgroundColor: `hsl(${120 * (seal.score / maxScore)},76%,76%)`
        }}
      >
        <CardContent>
          <Typography variant={"display1"}>
            {seal.Name ? seal.Name : seal.FirstObservation}
          </Typography>
          <div className={classes.cardRow}>
            <div className={classes.cardColumn}>
              <Typography>Sex: {seal.Sex ? seal.Sex : "Unknown"}</Typography>
              <Typography>
                Procedure: {seal.Procedure ? seal.Procedure : "None"}
              </Typography>
            </div>
            <div className={classes.cardColumn}>
              {seal.marks.map((mark, index) => (
                <MarkChip
                  className={classes.chip}
                  key={index}
                  number={mark.Number}
                  position={mark.Position}
                />
              ))}
            </div>
            <div className={classes.cardColumn}>
              {seal.tags.map((tag, index) => (
                <TagChip
                  className={classes.chip}
                  key={index}
                  number={tag.Number}
                  color={tag.Color}
                  position={tag.Position}
                />
              ))}
            </div>
          </div>
        </CardContent>
        <CardActions>
          <Button onClick={this.useExistingSeal}>Use</Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(SealValidationCard);
