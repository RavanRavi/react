export const validateSkill = (skill) => {
    if (!skill.skill) {
        return 'Skill is required';
    }
    if (!skill.rating) {
        return 'Rating is required';
    }
    return '';
};