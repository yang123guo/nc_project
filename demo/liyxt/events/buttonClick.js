export default function(props, id) {
	switch (id) {
		case 'add':
			props.editTable.addRow('investTable');
			break;
		case 'save':
			props.editTable.save('investTable', function(changedRows, allRows) {
				console.log(changedRows, allRows);
			});
			break;
		case 'edit':
			props.editTable.edit('investTable', function() {
				console.log(this);
			});
			break;
		case 'cancel':
			props.editTable.cancelEdit('investTable', function() {
				console.log(this);
			});
			break;
		case 'del':
			props.editTable.delRow('investTable', 0);
			break;
		default:
			break;
	}
}
