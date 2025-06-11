import * as fs from 'fs';

const filePath = 'src/common/rolePermissions/scopes.json';
export const RolePermissions = (): any[] => {
    try {
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const jsonData: any[] = JSON.parse(fileContent);

        return jsonData;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
};
