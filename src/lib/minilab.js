// Unit 1's ethics mini-lab, "When Class Balance Changes", run for real on
// scikit-learn 1.9.0, changing only new_positive_weight. Each row pools the
// notebook's cell over random_state 1-25 (3,000 test applicants), because one
// draw of 400 is noisy. Regenerate from the notebook rather than editing.
export const RUNS = [
    { label: "1 in 2", weight: "0.5", accuracy: 0.963, recall: 0.958, winners: 1501, missed: 63 },
    { label: "1 in 3", weight: "0.33", accuracy: 0.971, recall: 0.944, winners: 999, missed: 56 },
    { label: "1 in 5", weight: "0.2", accuracy: 0.977, recall: 0.921, winners: 609, missed: 48 },
    { label: "1 in 10", weight: "0.1", accuracy: 0.978, recall: 0.812, winners: 309, missed: 58 },
    { label: "1 in 20", weight: "0.05", accuracy: 0.981, recall: 0.669, winners: 163, missed: 54 },
];
